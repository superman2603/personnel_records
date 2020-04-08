using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Personal_Records.Controllers
{
    public class UploadFileController : Controller
    {
        #region UploadCSVFile
        [HttpPost]
        public ActionResult UploadFiles()
        {
            string counter = "";
            if (Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {

                        HttpPostedFileBase file = files[i];
                        string fname;

                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        fname = Path.Combine(Server.MapPath("~/Uploads/"), fname);
                        file.SaveAs(fname);

                        using (PersonnelRecordsController pr = new PersonnelRecordsController())
                        {
                            counter = pr.ParseCSVFile(file);
                        }
                    }
                    return Json("File Uploaded Successfully! " + counter + " row(s) were successfully processed");
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json("No files selected.");
            }
        }
        #endregion
    }
}