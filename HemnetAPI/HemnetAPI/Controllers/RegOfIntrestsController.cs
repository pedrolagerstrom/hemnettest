using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HemnetAPI.Data;
using HemnetAPI.Models;

namespace HemnetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegOfIntrestsController : ControllerBase
    {
        private readonly HemnetContext _context;

        public RegOfIntrestsController(HemnetContext context)
        {
            _context = context;
        }

        // GET: api/RegOfIntrests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegOfIntrest>>> GetRegOfIntrests()
        {
            return await _context.RegOfIntrests.Include(c => c.Customer).Include(h => h.HouseObject).ToListAsync();
        }

        // GET: api/RegOfIntrests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegOfIntrest>> GetRegOfIntrest(string id)
        {
            var regOfIntrest = await _context.RegOfIntrests.FindAsync(id);

            if (regOfIntrest == null)
            {
                return NotFound();
            }

            return regOfIntrest;
        }

        // PUT: api/RegOfIntrests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegOfIntrest(string id, RegOfIntrest regOfIntrest)
        {
            if (id != regOfIntrest.CustomerEmail)
            {
                return BadRequest();
            }

            _context.Entry(regOfIntrest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegOfIntrestExists(id))
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

        // POST: api/RegOfIntrests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegOfIntrest>> PostRegOfIntrest(RegOfIntrest regOfIntrest)
        {
            _context.RegOfIntrests.Add(regOfIntrest);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RegOfIntrestExists(regOfIntrest.CustomerEmail))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRegOfIntrest", new { id = regOfIntrest.CustomerEmail }, regOfIntrest);
        }

        // DELETE: api/RegOfIntrests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegOfIntrest(string id)
        {
            var regOfIntrest = await _context.RegOfIntrests.FindAsync(id);
            if (regOfIntrest == null)
            {
                return NotFound();
            }

            _context.RegOfIntrests.Remove(regOfIntrest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegOfIntrestExists(string id)
        {
            return _context.RegOfIntrests.Any(e => e.CustomerEmail == id);
        }
    }
}
