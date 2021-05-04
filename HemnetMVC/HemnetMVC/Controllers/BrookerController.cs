using HemnetMVC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HemnetMVC.Controllers
{
    public class BrookerController : Controller
    {
        private IConfiguration _config;
        public BrookerController(IConfiguration config)
        {
            _config = config;
        }
        // GET: BrookerController
        public async Task<ActionResult> Brookers()
        {
            IList<BrookerViewModel> houses = null;

            using (var client = new HttpClient())
            {
                var result = await client.GetAsync(_config.GetValue<string>("prod") + "Brookers");

                if (result.IsSuccessStatusCode)
                {
                    houses = await result.Content.ReadAsAsync<IList<BrookerViewModel>>();
                }
                else
                {
                    return NotFound();
                }
            }
            return View(houses.ToList());
        }
    }
}
