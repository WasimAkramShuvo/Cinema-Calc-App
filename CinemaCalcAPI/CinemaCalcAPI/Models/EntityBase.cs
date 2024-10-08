﻿using System.ComponentModel.DataAnnotations;

namespace CinemaCalcAPI.Models
{
    public class EntityBase: IEntityBase
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
    }
}
