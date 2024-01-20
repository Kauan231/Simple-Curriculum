
# Simple-Curriculum

Simple-Curriculum é um projeto pessoal para aprimorar minhas habilidades em ASP.NET com o uso da Biblioteca QuestPDF, além de explorar ferramentas do frontend como ReactJS, Typescript e Tailwind. O objetivo do projeto é disponibilizar uma API para a criação de curriculos formatados automaticamente, assim podendo ser utilizado como ferramenta individual ou utilizado como exemplo em uma ferramenta de um site de vagas de trabalho.


## Stack utilizada

**Front-end:** React, TailwindCSS, Toastify (Biblioteca Javascript).

**Back-end:** ASP.NET, QuestPDF (Biblioteca .NET).


## Uso/Exemplos
### Javascript
```javascript
    try{
        fetch('http://localhost:5251/CV', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: Nome,
                perfil: Perfil,
                experiencias:_experiencias,
                educação:_educacoes,
                cursos: _cursos,
                habilidades: _habilidades,
                contatos: {
                    email: _email,
                    telefone: _telefone,
                    links: _links
                }
            })
        })
        .then((response) => response.blob())
        .then((response) => {
            const blob = new Blob([response], {type: 'application/pdf'});
            const link = document.createElement('a');
            link.download = 'Curriculo.pdf';
            link.href = URL.createObjectURL(blob);
            link.click();
        });     
    } catch(error) {
        console.log(error);
    }

```
### Json
``` json
{
  "nome": "Maria Oliveira",
  "perfil": "Designer Gráfico",
  "experiencias": [
    {
      "nomeDaEmpresa": "Design Studio",
      "inicio": "Fev 2015",
      "fim": "Atual",
      "descrição": "Responsável pela criação de identidades visuais e materiais gráficos para clientes diversos."
    }
  ],
  "educação": [
    {
      "nomeDoCurso": "Bacharelado em Design Gráfico",
      "instituição": "Universidade ABC",
      "inicio": "Set 2011",
      "fim": "Dez 2014",
      "descrição": "Enfoque em design digital, tipografia e técnicas de ilustração."
    }
  ],
  "cursos": [
    {
      "nomeDoCurso": "Curso Avançado de Adobe Illustrator",
      "instituição": "Online Design Academy",
      "cargaHoraria": "30 horas"
    }
  ],
  "habilidades": [
    "Adobe Illustrator",
    "Photoshop",
    "InDesign",
    "UI/UX Design"
  ],
  "contatos": {
    "email": "maria.oliveira@email.com",
    "telefone": "+55 11 1234-5678",
    "links": [
      "linkedin.com/in/mariaoliveira",
      "behance.net/maria_designer"
    ]
  }
}
```



## Funcionalidades

- Geração de Curriculo formatado em PDF
- Verificação de Inputs e Mensagens de erro em Toast
- Responsividade



## Demonstração

![image](https://github.com/Kauan231/Simple-Curriculum/assets/63317471/6e1e6ba6-4e05-49a1-a9b0-51f5d4b473d2)
[Curriculo.pdf](https://github.com/Kauan231/Simple-Curriculum/files/13996090/Curriculo.pdf)



## Futuras melhorias

- Adicionar mais modelos de Curriculo.
- Adicionar mais verificações no Frontend



