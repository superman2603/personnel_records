using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Personal_Records.Models
{
    [Table("personnel_records")]
    public class PersonnelRecordsModel
    {
        [Key]
        public int id { get; set; }     
        public string payroll_number { get; set; }
        public string forenames { get; set; }
        public string surname { get; set; }
        public string date_of_birth { get; set; }
        public string telephone { get; set; }
        public string mobile { get; set; }
        public string address { get; set; }
        public string address_2 { get; set; }
        public string post_code { get; set; }
        public string email_home { get; set; }
        public string start_date { get; set; }
    }
}