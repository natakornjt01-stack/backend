
import { NextResponse } from "next/server";

// ข้อมูลตัวอย่างผู้ใช้
const users = [
  {
    id: "11111",
    name: "Zen",
    email: "zen@example.com",
    age: 18,
  },
  {
    id: "22222",
    name: "Alice",
    email: "alice@example.com",
    age: 20,
  },
  {
    id: "33333",
    name: "Bob",
    email: "bob@example.com",
    age: 22,
  },
];

//================================================================================
// GET ALL Function (/app/api/users/route.js)
//================================================================================
export async function GET() {
  try {
    console.log({
      success: true,
      message: "ดึงข้อมูลผู้ใช้ทั้งหมดสำเร็จ",
      total: users.length,
      status: 200,
    });

    return NextResponse.json(
      {
        success: true,
        message: "ดึงข้อมูลผู้ใช้ทั้งหมดสำเร็จ",
        total: users.length,
        data: users,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error
          ? error.message
          : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
