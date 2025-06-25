import { NextResponse } from 'next/server';
const pool = require('../../../lib/db-client');

export async function GET() {
  try {
    console.log("👉 Connecting to DB...");
    
    const result = await pool.query('SELECT * FROM voter_registration_deadlines');
    
    console.log("✅ Query successful. Rows returned:", result.rows.length);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("❌ Error in /api/states:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




