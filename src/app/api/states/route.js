import { NextResponse } from 'next/server';
const pool = require('../../../lib/db-client');

export async function GET() {
  try {
    const result = await pool.query('SELECT * from voter_registration_deadlines');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching voter data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



