using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HemnetAPI.Data;
using HemnetAPI.Models;
using server.API.Attributes;

namespace HemnetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HouseObjectsController : ControllerBase
    {
        private readonly HemnetContext _context;

        public HouseObjectsController(HemnetContext context)
        {
            _context = context;
        }

        // GET: api/HouseObjects
        //[GoogleAuthorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HouseObject>>> GetHouseObjects()
        {
            return await _context.HouseObjects.Include(b => b.Brooker).ToListAsync();
        }

        // GET: api/HouseObjects/5
        //[GoogleAuthorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<HouseObject>> GetHouseObject(int id)
        {
            var houseObject = await _context.HouseObjects.FindAsync(id);
            houseObject.Brooker = await _context.Brookers.FirstOrDefaultAsync(brooker => brooker.BrookerId == houseObject.BrookerId);

            if (houseObject == null)
            {
                return NotFound();
            }

            return houseObject;
        }

        // PUT: api/HouseObjects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [GoogleAuthorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHouseObject(int id, HouseObject houseObject)
        {
            if (id != houseObject.HouseObjectId)
            {
                return BadRequest();
            }

            _context.Entry(houseObject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HouseObjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HouseObjects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [GoogleAuthorize]
        [HttpPost]
        public async Task<ActionResult<HouseObject>> PostHouseObject(HouseObject houseObject)
        {
            _context.HouseObjects.Add(houseObject);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHouseObject", new { id = houseObject.HouseObjectId }, houseObject);
        }

        // DELETE: api/HouseObjects/5
        [GoogleAuthorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHouseObject(int id)
        {
            var houseObject = await _context.HouseObjects.FindAsync(id);
            if (houseObject == null)
            {
                return NotFound();
            }

            _context.HouseObjects.Remove(houseObject);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/RegOfIntrest        
        [HttpPost("{houseObjectId}/RegOfIntrest")]
        public async Task<ActionResult<RegOfIntrest>> RegOfIntrest(int houseObjectId, Customer customer)
        {
            // check if the book exists
            var house = await _context.HouseObjects.FindAsync(houseObjectId);
            if (house == null)
            {
                return NotFound();
            }

            // create user if it doesn't exist
            if (!CustomerExists(customer.Email))
            {
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
            }


            var subscription = new RegOfIntrest() { HouseObjectId = houseObjectId, CustomerEmail = customer.Email };

            // check if the user is already subscribed and return conflict
            if (RegOfIntrestExists(subscription.HouseObjectId, subscription.CustomerEmail))
            {
                return Conflict();
            }

            // finally add subscription
            _context.RegOfIntrests.Add(subscription);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return subscription;
        }

        private bool HouseObjectExists(int id)
        {
            return _context.HouseObjects.Any(e => e.HouseObjectId == id);
        }
        private bool RegOfIntrestExists(int houseObjectId, string customerEmail)
        {
            return _context.RegOfIntrests.Any(e => e.HouseObjectId == houseObjectId && e.CustomerEmail == customerEmail);
        }

        private bool CustomerExists(string email)
        {
            return _context.Customers.Any(e => e.Email == email);
        }
    }
}
