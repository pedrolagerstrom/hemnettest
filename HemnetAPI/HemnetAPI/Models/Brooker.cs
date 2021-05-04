using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HemnetAPI.Models
{
    
    public class Brooker
    {

        [Key]
        public int BrookerId { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [EmailAddress]
        public string Email { get; set; }

        public virtual ICollection<HouseObject> HouseObjects { get; set; }
    }

}