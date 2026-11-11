import Image from 'next/image';
import { skills } from '@/content/skills';

const logos: Record<string, string> = {
  'PyTorch': 'pytorch_logo.png', 'TensorFlow': 'tensorflow_logo.png', 'Keras': 'keras_logo.png',
  'Scikit-learn': 'sklearn_logo.png', 'spaCy & NLTK': 'nltk_logo.png', 'Python': 'python.png',
  'Pandas': 'pandas_logo.png', 'NumPy': 'Numpy_logo.png', 'SQL': 'sql.png',
  'PostgreSQL': 'postgre.png', 'MySQL & SQL Server': 'mysql.png', 'MongoDB': 'mongodb.png',
  'Power BI': 'PowerBI_Logo.png', 'Tableau': 'tableau_logo.png', 'FastAPI': 'fastapi_logo.png',
  'Flask': 'flask_logo.png', 'Docker': 'docker_logo.png', 'MLflow': 'mlflow_logo.png',
  'DAGsHub': 'dagshub_logo.png', 'Git & GitHub': 'git.png', 'Jupyter': 'jupyter_logo.png',
};

export default function Scene03TechUniverse() {
  return <section id="scene-tech" className="relative z-10 scroll-mt-24 border-t border-white/10 bg-transparent px-6 py-24 text-white md:px-12 lg:px-20">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm text-sky-100/75">Skills</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Tools and areas of focus</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">A broader view of my work across AI applications, machine learning, software, and data.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map(group => <section key={group.category} className="rounded-2xl border border-white/15 bg-[#07111d]/[.84] p-5 sm:p-6">
          <h3 className="mb-4 text-lg font-medium text-white">{group.category}</h3>
          <ul className="grid grid-cols-2 gap-2.5">
            {group.skills.map(skill => {
              const logo = logos[skill.name];
              return <li key={skill.name} className="flex min-h-12 items-center gap-2.5 rounded-xl border border-white/10 bg-[#07111d]/80 px-3 py-2 text-sm text-white/85">
                {logo ? <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white p-1"><Image src={`/portfolio/skills/${logo}`} alt="" width={28} height={28} className="h-full w-full object-contain" /></span> : <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-sky-100/25 bg-sky-100/10 text-[10px] font-semibold text-sky-100">{skill.group === 'ai' ? 'AI' : skill.name.slice(0, 2).toUpperCase()}</span>}
                <span className="leading-snug">{skill.name}</span>
              </li>;
            })}
          </ul>
        </section>)}
      </div>
    </div>
  </section>;
}
