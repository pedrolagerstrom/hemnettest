using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HemnetAPI.Models
{
        public class HouseObject
        {
            [Key]
            public int HouseObjectId { get; set; }
            public string Images { get; set; }
            public string Address { get; set; }
            public string HousingType { get; set; }
            public string FormOfLease { get; set; }
            public string Price { get; set; }
            public int Rooms { get; set; }
            public int LivingArea { get; set; }
            public int? BiArea { get; set; }
            public int? PlotArea { get; set; }
            public string Descriptions { get; set; }
            [DisplayFormat(DataFormatString = "{0:dd MMM yyyy}")]
            public DateTime ShowingDate { get; set; }
            public int BuildYear { get; set; }            
            public string Latitude { get; set; }
            public string Longitude { get; set; }
            public int BrookerId { get; set; }            

            public  Brooker Brooker { get; set; }
            
            public ICollection<RegOfIntrest> RegOfIntrests { get; set; }

        }

}
