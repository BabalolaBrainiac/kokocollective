#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'
import * as argon2 from 'argon2'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { email: '', password: '', role: 'admin', help: false }

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--email':
        opts.email = args[++i] || ''
        break
      case '--password':
        opts.password = args[++i] || ''
        break
      case '--role':
        opts.role = args[++i] || 'admin'
        break
      case '--help':
      case '-h':
        opts.help = true
        break
      default:
        break
    }
  }

  return opts
}

function printHelp() {
  console.log(`
create-admin — Create an admin user for the Kokokollective admin portal

Usage:
  npm run create-admin -- --email <email> --password <password> [--role <admin|superuser>]

Options:
  --email      Admin email address (required)
  --password   Plaintext password (required, min 8 characters)
  --role        Role: 'admin' or 'superuser' (default: 'admin')
  --help, -h   Show this help message

Example:
  npm run create-admin -- --email admin@kokokollective.com --password MyS3cur3P@ss --role superuser
`)
}

async function main() {
  const { email, password, role, help } = parseArgs()

  if (help) {
    printHelp()
    process.exit(0)
  }

  if (!email) {
    console.error('Error: --email is required')
    process.exit(1)
  }

  if (!password) {
    console.error('Error: --password is required')
    process.exit(1)
  }

  if (password.length < 8) {
    console.error('Error: password must be at least 8 characters')
    process.exit(1)
  }

  if (!['admin', 'superuser'].includes(role)) {
    console.error('Error: role must be "admin" or "superuser"')
    process.exit(1)
  }

  const { data: existingUser } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single()

  if (existingUser) {
    console.error(`Error: a user with email "${email}" already exists`)
    process.exit(1)
  }

  const passwordHash = await argon2.hash(password)

  const { data, error } = await supabase
    .from('admin_users')
    .insert([{ email, password_hash: passwordHash, role }])
    .select('id, email, role, created_at')
    .single()

  if (error) {
    console.error(`Error creating admin user: ${error.message}`)
    process.exit(1)
  }

  console.log(`Admin user created successfully:`)
  console.log(`  ID:        ${data.id}`)
  console.log(`  Email:     ${data.email}`)
  console.log(`  Role:      ${data.role}`)
  console.log(`  Created:   ${data.created_at}`)
}

main().catch((err) => {
  console.error(`Unexpected error: ${err.message}`)
  process.exit(1)
})
