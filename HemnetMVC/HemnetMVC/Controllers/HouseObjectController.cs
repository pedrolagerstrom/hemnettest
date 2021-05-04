using HemnetMVC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace HemnetMVC.Controllers
{
    public class HouseObjectController : Controller
    {
        private IConfiguration _config;
        public HouseObjectController(IConfiguration config)
        {
            _config = config;
        }

        // GET: HouseObjectController
        public async Task<ActionResult> Index(string sortAddress, string sortPrice, string sortRooms, string sortLivingArea, string sortLivingAreaMax)
        {
            IList<HouseObjectViewModel> houses = null;

            using (var client = new HttpClient())
            {
                var result = await client.GetAsync(_config.GetValue<string>("prod") + "HouseObjects");

                if (result.IsSuccessStatusCode)
                {
                    houses = await result.Content.ReadAsAsync<IList<HouseObjectViewModel>>();

                    // Searchbox
                    if (!string.IsNullOrEmpty(sortAddress))
                    {
                        var searchResult = houses
                            .Where(r => r.Address.ToLower().Contains(sortAddress.ToLower()));

                        // Show to results on the search
                        return View(searchResult);
                    }

                    if (!string.IsNullOrEmpty(sortPrice))
                    {                        
                        var searchResult = houses
                            .Where(r => Convert.ToDouble(r.Price) <= Convert.ToDouble(sortPrice));

                        // Show to results on the search
                        return View(searchResult);
                    }

                    if (!string.IsNullOrEmpty(sortRooms))
                    {
                        var searchResult = houses
                            .Where(r => Convert.ToDouble(r.Rooms) >= Convert.ToDouble(sortRooms));

                        // Show to results on the search
                        return View(searchResult);
                    }

                    if (!string.IsNullOrEmpty(sortLivingArea))
                    {
                        var searchResult = houses
                            .Where(r => Convert.ToDouble(r.LivingArea) >= Convert.ToDouble(sortLivingArea));

                        // Show to results on the search
                        return View(searchResult);
                    }

                    if (!string.IsNullOrEmpty(sortLivingAreaMax))
                    {
                        var searchResult = houses
                            .Where(r => Convert.ToDouble(r.LivingArea) <= Convert.ToDouble(sortLivingAreaMax));

                        // Show to results on the search
                        return View(searchResult);
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            return View(houses);
        }

        public async Task<ActionResult> Map()
        {
            IList<HouseObjectViewModel> houses = null;

            using (var client = new HttpClient())
            {
                var result = await client.GetAsync(_config.GetValue<string>("prod") + "HouseObjects");

                if (result.IsSuccessStatusCode)
                {
                    houses = await result.Content.ReadAsAsync<IList<HouseObjectViewModel>>();
                }
                else
                {
                    return NotFound();
                }
            }
            return View(houses.ToList());
        }

        // GET: HouseObjectController/Details/5
        public async Task<ActionResult> Details(int id)
        {

            HouseObjectViewModel houses = null;

            using (var client = new HttpClient())
            {
                var result = await client.GetAsync(_config.GetValue<string>("prod") + "HouseObjects" + id);

                if (result.IsSuccessStatusCode)
                {
                    houses = await result.Content.ReadAsAsync<HouseObjectViewModel>();
                }
                else
                {
                    return NotFound();
                }

                return View(houses);
            }
        }

        // POST: HouseObjectController/Details/5
        public async Task<ActionResult> RegOfIntrest(HouseObjectViewModel objects)
        {
            if (!ModelState.IsValid)
            {
                return View("Details", objects);
            }

            using var client = new HttpClient();
            var result = await client.PostAsJsonAsync(_config.GetValue<string>("prod") + "HouseObjects" + objects.HouseObjectId + "/RegOfIntrest", objects);

            if (result.IsSuccessStatusCode)
            {
                ViewData["Message"] = "Tack för din intresseanmälan";
                return View("Registration");
            }
            else if (result.StatusCode == HttpStatusCode.Conflict)
            {
                ViewData["Message"] = "Du har redan gjort en intresseanmälan på detta objekt";
                return View("Registration");
            }

            return NotFound();
        }
    }
}
