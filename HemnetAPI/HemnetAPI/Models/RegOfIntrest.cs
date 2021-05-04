using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HemnetAPI.Models
{
    public class RegOfIntrest
    {
        public int HouseObjectId { get; set; }
        [EmailAddress]
        public string CustomerEmail { get; set; }

        public  Customer Customer { get; set; }
        public HouseObject HouseObject { get; set; }
    }
}
