namespace SimpleCurriculum.Models
{
    public class Curriculum
    {
        public string Nome { get; set; }
        public string Perfil { get; set; }
        public List<Experiencia> Experiencias { get; set; }
        public List<Educação> Educação { get; set; }
        public List<Curso> Cursos { get; set; }
        public List<string> Habilidades { get; set; }
        public Contato Contatos { get; set; }
    }

    public class Experiencia
    {
        public string NomeDaEmpresa { get; set; }
        public string Inicio { get; set; }
        public string Fim { get; set; }
        public string Descrição { get; set; }
    }

    public class Educação
    {
        public string NomeDoCurso { get; set; }
        public string Instituição { get; set; }
        public string Inicio { get; set; }
        public string Fim { get; set; }
        public string Descrição { get; set; }
        public string Grau { get; set; }
    }

    public class Curso
    {
        public string NomeDoCurso { get; set; }
        public string Instituição { get; set; }
        public string CargaHoraria { get; set; }
    }

    public class Contato
    {
        public string Email { get; set; }
        public string Telefone { get; set; }
        public List<string> Links { get; set; }
    }
}
