using Personal_Records.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Personal_Records.Models
{
    public class DataContext : DbContext
    {
        public DbSet<PersonnelRecordsModel> PRModel { get; set; }
    }
}