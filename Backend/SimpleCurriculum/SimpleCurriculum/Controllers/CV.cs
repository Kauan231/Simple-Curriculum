using Microsoft.AspNetCore.Mvc;
using SimpleCurriculum.Models;
using SimpleCurriculum.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SimpleCurriculum.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CV : ControllerBase
    {
        // GET: api/<CV>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/<CV>
        [HttpPost]
        public FileStreamResult Post([FromBody] Curriculum _curriculum)
        {
            PDFGenerator _curriculumGenerator = new PDFGenerator(_curriculum);
            FileStreamResult file = _curriculumGenerator.CreatePDF();
            return file;
        }
    }
}
