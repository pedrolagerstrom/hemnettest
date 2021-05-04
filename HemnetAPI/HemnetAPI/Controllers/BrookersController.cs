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
    public class BrookersController : ControllerBase
    {
        private readonly HemnetContext _context;

        public BrookersController(HemnetContext context)
        {
            _context = context;
        }

        // GET: api/Brookers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brooker>>> GetBrookers()
        {
            return await _context.Brookers.ToListAsync();
        }

        // GET: api/Brookers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brooker>> GetBrooker(int id)
        {
            var brooker = await _context.Brookers.FindAsync(id);

            if (brooker == null)
            {
                return NotFound();
            }

            return brooker;
        }

        // PUT: api/Brookers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrooker(int id, Brooker brooker)
        {
            if (id != brooker.BrookerId)
            {
                return BadRequest();
            }

            _context.Entry(brooker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrookerExists(id))
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

        // POST: api/Brookers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Brooker>> PostBrooker(Brooker brooker)
        {
            _context.Brookers.Add(brooker);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBrooker", new { id = brooker.BrookerId }, brooker);
        }

        // DELETE: api/Brookers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrooker(int id)
        {
            var brooker = await _context.Brookers.FindAsync(id);
            if (brooker == null)
            {
                return NotFound();
            }

            _context.Brookers.Remove(brooker);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BrookerExists(int id)
        {
            return _context.Brookers.Any(e => e.BrookerId == id);
        }
    }
}
