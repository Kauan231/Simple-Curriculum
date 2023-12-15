using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPDF.Previewer;
using SimpleCurriculum.Models;
using System.Data.Common;

namespace SimpleCurriculum.Services
{
    public class PDFGenerator
    {
        private Curriculum _curriculum;

        public PDFGenerator(Curriculum _curriculumToCreate) {
            _curriculum = _curriculumToCreate;
        }
        public FileStreamResult CreatePDF()
        {
            Document document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.MarginLeft(3, Unit.Centimetre);
                    page.MarginTop(3, Unit.Centimetre);
                    page.MarginRight(2, Unit.Centimetre);
                    page.MarginBottom(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(12));

                    page.Header()
                        .AlignLeft()
                        .Text(_curriculum.Nome)
                        .SemiBold()
                        .FontSize(20);
                    page.Content()
                    .Column(x =>
                    {
                        x.Item().PaddingVertical(5).LineHorizontal(1).LineColor(Colors.Grey.Medium);

                        x.Item().Inlined(inline =>
                        {
                            inline.AlignCenter();
                            inline.HorizontalSpacing(10);
                            inline.Item().Text(_curriculum.Contatos.Email);
                            inline.Item().Text("|");
                            inline.Item().Text(_curriculum.Contatos.Telefone);
                            foreach (string link in _curriculum.Contatos.Links)
                            {
                                inline.Item().Text("|");
                                inline.Item().Text(link);
                            }
                        });

                        x.Item().PaddingTop(10).Text("Perfil").Italic().SemiBold().FontSize(15).Underline();
                        x.Item().Text(_curriculum.Perfil);

                        x.Item().PaddingTop(10).Text("Experiência").Italic().SemiBold().FontSize(15).Underline();

                        foreach (Experiencia experiencia in _curriculum.Experiencias)
                        {
                            x.Item().Inlined(inline =>
                            {
                                inline.AlignLeft();
                                inline.Item().Text(experiencia.NomeDaEmpresa).Bold();
                                inline.Item().Text(" | " + experiencia.Inicio + " - " + experiencia.Fim).Bold();
                            });

                            x.Item().PaddingLeft(10).Text(experiencia.Descrição);
                        }


                        x.Item().PaddingTop(10).Text("Educação").Italic().SemiBold().FontSize(15).Underline();
                        foreach (Educação educação in _curriculum.Educação)
                        {
                            x.Item().Text(educação.NomeDoCurso).Bold();
                            x.Item().PaddingLeft(10).Text("· " + educação.Instituição);
                            x.Item().PaddingLeft(10).Text("· " + educação.Grau);
                            x.Item().PaddingLeft(10).Text("· " + educação.Inicio + " - " + educação.Fim);
                        }

                        x.Item().PaddingTop(10).Text("Cursos e Certificados").Italic().SemiBold().FontSize(15).Underline();
                        foreach (Curso curso in _curriculum.Cursos)
                        {
                            x.Item().Text(curso.NomeDoCurso).Bold();
                            x.Item().PaddingLeft(10).Text("· " + curso.Instituição);
                            x.Item().PaddingLeft(10).Text("· " + curso.CargaHoraria);
                        }

                        x.Item().PaddingTop(10).Text("Habilidades e Conhecimentos").Italic().SemiBold().FontSize(15).Underline();
                        foreach (string habilidades in _curriculum.Habilidades)
                        {
                            x.Item().Text("· " + habilidades);
                        }
                    });
                });
            });

            //document.ShowInPreviewer();

            
            byte[] pdfBytes = document.GeneratePdf();
            MemoryStream ms = new MemoryStream(pdfBytes);
            return new FileStreamResult(ms, "application/pdf");
        }

    }
}
