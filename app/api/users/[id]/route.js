// นำเข้า NextResponse จาก next/server เพื่อใช้จัดการและส่งค่า HTTP Response กลับไปยังไคลเอนต์
import { NextResponse } from "next/server";

//================================================================================
// GET By ID Function (/src/app/api/users/[id]/route.js)
//================================================================================
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log({ success: true, message: `ดึงข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`, status: 200 });

    return NextResponse.json(
      {
        success: true,
        message: "ดึงข้อมูลผู้ใช้สำเร็จ",
        data: { id } 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

//================================================================================
// POST Function (สำหรับสร้างข้อมูลใหม่ หรือส่งข้อมูลเข้ามา)
//================================================================================
export async function POST(request) {
  try {
    // รับข้อมูล Body ที่ส่งมาจาก Client (เช่น JSON)
    const body = await request.json();
    console.log({ success: true, message: "สร้างข้อมูลผู้ใช้ใหม่สำเร็จ", data: body, status: 201 });

    return NextResponse.json(
      {
        success: true,
        message: "สร้างข้อมูลผู้ใช้สำเร็จ",
        data: body,
      },
      { status: 201 } 
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

//================================================================================
// PUT Function (สำหรับอัปเดตข้อมูลผู้ใช้ตาม ID) (/src/app/api/users/[id]/route.js)
//================================================================================
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json(); // ข้อมูลใหม่ที่ต้องการอัปเดต
    
    console.log({ success: true, message: `อัปเดตข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`, data: body, status: 200 });

    return NextResponse.json(
      {
        success: true,
        message: `อัปเดตข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
        data: { id, ...body },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

//================================================================================
// DELETE Function (สำหรับลบข้อมูลผู้ใช้ตาม ID) (/src/app/api/users/[id]/route.js)
//================================================================================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    console.log({ success: true, message: `ลบข้อมูลผู้ใช้คนที่ ${id} สำเร็จ`, status: 200 });

    return NextResponse.json(
      {
        success: true,
        message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}