using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HemnetMVC.Models
{
    public class HouseObjectViewModel
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
        public int BrookerId { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        [EmailAddress]
        [Required(ErrorMessage = "Du måste fylla i en korrekt Email-address")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Du måste fylla i ett förnamn")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Du måste fylla i ett efternamn")]
        public string LastName { get; set; }


        public BrookerViewModel Brooker { get; set; }
    }
}
