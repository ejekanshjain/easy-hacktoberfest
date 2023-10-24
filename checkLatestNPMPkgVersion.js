const { eachOfLimit } = require('async')

const deps = [
  {
    '@editorjs/checklist': '^1.5.0',
    '@editorjs/delimiter': '^1.3.0',
    '@editorjs/editorjs': '^2.28.0',
    '@editorjs/header': '^2.7.0',
    '@editorjs/image': '^2.8.1',
    '@editorjs/list': '^1.8.0',
    '@editorjs/quote': '^2.5.0',
    '@editorjs/table': '^2.2.2',
    '@ejekanshjain/cloud-storage': '^3.0.0',
    '@hookform/resolvers': '^3.3.1',
    '@next-auth/prisma-adapter': '^1.0.7',
    '@prisma/client': '^5.3.1',
    '@radix-ui/react-alert-dialog': '^1.0.4',
    '@radix-ui/react-avatar': '^1.0.3',
    '@radix-ui/react-checkbox': '^1.0.4',
    '@radix-ui/react-dialog': '^1.0.4',
    '@radix-ui/react-dropdown-menu': '^2.0.5',
    '@radix-ui/react-label': '^2.0.2',
    '@radix-ui/react-popover': '^1.0.6',
    '@radix-ui/react-select': '^1.2.2',
    '@radix-ui/react-separator': '^1.0.3',
    '@radix-ui/react-slot': '^1.0.2',
    '@radix-ui/react-toast': '^1.1.4',
    '@t3-oss/env-nextjs': '^0.6.1',
    '@tailwindcss/typography': '^0.5.10',
    '@tanstack/react-table': '^8.10.1',
    '@types/eslint': '^8.44.2',
    '@types/lodash': '^4.14.199',
    '@types/node': '^20.6.3',
    '@types/nodemailer': '^6.4.10',
    '@types/react': '^18.2.22',
    '@types/react-dom': '^18.2.7',
    '@typescript-eslint/eslint-plugin': '^6.7.2',
    '@typescript-eslint/parser': '^6.7.2',
    '@vercel/analytics': '^1.0.2',
    autoprefixer: '^10.4.16',
    'class-variance-authority': '^0.7.0',
    clsx: '^2.0.0',
    cmdk: '^0.2.0',
    dayjs: '^1.11.10',
    'editorjs-html': '^3.4.3',
    eslint: '^8.50.0',
    'eslint-config-next': '^13.5.2',
    lodash: '^4.17.21',
    'lucide-react': '^0.274.0',
    next: '^13.5.2',
    'next-auth': '^4.23.1',
    'next-themes': '^0.2.1',
    nodemailer: '^6.9.5',
    postcss: '^8.4.30',
    prettier: '^3.0.3',
    'prettier-plugin-tailwindcss': '^0.5.4',
    prisma: '^5.3.1',
    react: '^18.2.0',
    'react-dom': '^18.2.0',
    'react-hook-form': '^7.46.2',
    'tailwind-merge': '^1.14.0',
    tailwindcss: '^3.3.3',
    'tailwindcss-animate': '^1.0.7',
    typescript: '^5.2.2',
    zod: '^3.22.2'
  }
]

async function main() {
  const cache = {}
  const newDeps = []
  for (let i = 0; i < deps.length; i++) {
    console.log({ i })
    const dep = deps[i]
    const keys = Object.keys(dep).sort()
    const tempDep = {}
    await eachOfLimit(keys, 10, async (key, j) => {
      console.log({ i, j })
      const val = dep[key]
      const f = val.charAt(0)

      if (cache[key]) {
        if (f === '^' || f === '~') {
          tempDep[key] = f + cache[key]
        } else {
          tempDep[key] = cache[key]
        }
        return
      }

      const res = await fetch(`https://registry.npmjs.org/${key}`)
      const json = await res.json()
      const latest = json['dist-tags'].latest
      if (f === '^' || f === '~') {
        tempDep[key] = f + latest
      } else {
        tempDep[key] = latest
      }
      if (!cache[key]) {
        cache[key] = latest
      }
    })
    const newDep = {}
    for (const key of keys) newDep[key] = tempDep[key]
    newDeps.push(newDep)
  }

  console.log(JSON.stringify(newDeps))
}

main()
