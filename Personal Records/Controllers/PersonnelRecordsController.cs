using LumenWorks.Framework.IO.Csv;
using Personal_Records.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataTables;

namespace Personal_Records.Controllers
{
    public class PersonnelRecordsController : Controller
    {
        #region ConnectionVariables
        private static string constr = ConfigurationManager.ConnectionStrings["DataContext"].ToString();
        private SqlConnection con = new SqlConnection(constr);
        #endregion

        public ActionResult Index()
        {
            return View();
        }

        #region ParseCSVFile
        [HttpPost]
        public string ParseCSVFile(HttpPostedFileBase upload)
        {
            List<List<string>> allLineFields = new List<List<string>>();
            Stream stream = upload.InputStream;
            char delimiter = ',';
            using (CsvReader csvReader =
                new CsvReader(new StreamReader(stream), true, delimiter))
            {
                int fieldCount = csvReader.FieldCount;
                string[] headers = csvReader.GetFieldHeaders();

                while (csvReader.ReadNextRecord())
                {
                    List<string> fields = new List<string>(csvReader.FieldCount);
                    for (int i = 0; i < csvReader.FieldCount; i++)
                    {
                        try
                        {
                            string field = csvReader[i];
                            fields.Add(field.Trim('"'));
                        }
                        catch (MalformedCsvException ex)
                        {
                            throw;
                        }
                    }
                    allLineFields.Add(fields);
                }
            }
            return BulkInsert(allLineFields);
        }
        #endregion

        #region GetDataFromPersonnelRecords
        [HttpGet]
        public JsonResult GetAllPersonnelRecords()
        {
            using (DataContext db = new DataContext())
            {
                var cid = db.PRModel.SqlQuery("SELECT * FROM personnel_records order by surname asc").ToList();
                return Json(new { data = cid }, JsonRequestBehavior.AllowGet);
            }        
        }
        #endregion

        #region BulkInsertDataFromCSV
        public string BulkInsert(List<List<string>> lst)
        {
            int count = 0;
            var dt = new DataTable();
            dt.Columns.Add("id");
            dt.Columns.Add("payroll_number");
            dt.Columns.Add("forenames");
            dt.Columns.Add("surname");
            dt.Columns.Add("date_of_birth");
            dt.Columns.Add("telephone");
            dt.Columns.Add("mobile");
            dt.Columns.Add("address");
            dt.Columns.Add("address_2");
            dt.Columns.Add("post_code");
            dt.Columns.Add("email_home");
            dt.Columns.Add("start_date");
            try
            {
                for (int i = 0; i < lst.Count; i++)
                {
                    dt.Rows.Add("", lst[i][0], lst[i][1], lst[i][2], lst[i][3], lst[i][4], lst[i][5], lst[i][6], lst[i][7], lst[i][8], lst[i][9], lst[i][10]);
                    count++;
                }
                if (dt.Rows.Count > 0)
                {
                    using (var sqlBulk = new SqlBulkCopy(constr))
                    {
                        sqlBulk.BulkCopyTimeout = 5000;
                        sqlBulk.DestinationTableName = "dbo.personnel_records";
                        sqlBulk.WriteToServer(dt);
                        dt.Clear();
                    }
                }
                return count.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        #endregion

        #region CRUDforDataTables
        [HttpPost]
        public ActionResult CRUD()
        {
            var request = System.Web.HttpContext.Current.Request;

            using (var db = new Database("sqlserver", constr))
            {
                var response = new Editor(db, "personnel_records", "id")
                    .Model<PersonnelRecordsModel>()
                    .Field(new Field("id")
                        .Set(false)
                        .Validator(Validation.Numeric())
                    )
                        .Process(request)
                    .Data();

                return Json(response);
            }
        }
        #endregion
    }
}