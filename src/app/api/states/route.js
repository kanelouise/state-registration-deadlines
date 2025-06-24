import { NextResponse } from 'next/server';
const pool = require('../../../lib/db-client');

export async function GET() {
  try {
    // Make sure DB connection is ready
  const result = await pool.query('SELECT * from voter_registration_deadlines');
  return NextResponse.json(result.rows);

    // Fetch all states data
    const states = await VoterRegistrationDeadline.findAll();

    return NextResponse.json(states);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


