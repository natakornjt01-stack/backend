
import { NextResponse } from "next/server";

//================================================================================
// ข้อมูลผู้ใช้ตัวอย่าง
//================================================================================
let users = [
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
// ฟังก์ชันตรวจสอบ JSON Body
//================================================================================
async function readJsonBody(request) {
  try {
    const body = await request.json();

    if (
      body === null ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return { success: false };
    }

    return { success: true, data: body };
  } catch {
    return { success: false };
  }
}

//================================================================================
// GET ALL Function
// URL: GET /api/users
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
        error: error.message,
      },
      { status: 500 }
    );
  }
}

//================================================================================
// POST Function
// URL: POST /api/users
// เพิ่มข้อมูลผู้ใช้
//================================================================================
export async function POST(request) {
  try {
    const result = await readJsonBody(request);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "กรุณาส่งข้อมูล JSON ให้ถูกต้อง",
        },
        { status: 400 }
      );
    }

    const body = result.data;

    // สร้าง ID อัตโนมัติ หากไม่ได้ส่ง ID มา
    const id = body.id
      ? String(body.id)
      : String(Date.now());

    // ตรวจสอบ ID ซ้ำ
    if (users.some((user) => user.id === id)) {
      return NextResponse.json(
        {
          success: false,
          message: `ID ${id} มีอยู่แล้ว`,
        },
        { status: 409 }
      );
    }

    const newUser = {
      ...body,
      id,
    };

    users.push(newUser);

    console.log({
      success: true,
      message: "สร้างข้อมูลผู้ใช้สำเร็จ",
      data: newUser,
      status: 201,
    });

    return NextResponse.json(
      {
        success: true,
        message: "สร้างข้อมูลผู้ใช้สำเร็จ",
        data: newUser,
        total: users.length,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("POST USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

//================================================================================
// PUT Function
// URL: PUT /api/users
// แก้ไขข้อมูลผู้ใช้โดยใช้ ID จาก Body
//================================================================================
export async function PUT(request) {
  try {
    const result = await readJsonBody(request);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "กรุณาส่งข้อมูล JSON ให้ถูกต้อง",
        },
        { status: 400 }
      );
    }

    const body = result.data;

    if (body.id === undefined || body.id === null) {
      return NextResponse.json(
        {
          success: false,
          message: "กรุณาระบุ ID ของผู้ใช้ที่ต้องการแก้ไข",
        },
        { status: 400 }
      );
    }

    const id = String(body.id);

    const userIndex = users.findIndex(
      (user) => user.id === id
    );

    if (userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
        },
        { status: 404 }
      );
    }

    // อัปเดตข้อมูลโดยรักษา ID เดิม
    users[userIndex] = {
      ...users[userIndex],
      ...body,
      id,
    };

    console.log({
      success: true,
      message: `อัปเดตข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
      data: users[userIndex],
      status: 200,
    });

    return NextResponse.json(
      {
        success: true,
        message: `อัปเดตข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
        data: users[userIndex],
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("PUT USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

//================================================================================
// DELETE Function
// URL: DELETE /api/users
// ลบข้อมูลผู้ใช้โดยใช้ ID จาก Body
//================================================================================
export async function DELETE(request) {
  try {
    const result = await readJsonBody(request);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "กรุณาส่งข้อมูล JSON ให้ถูกต้อง",
        },
        { status: 400 }
      );
    }

    const body = result.data;

    if (body.id === undefined || body.id === null) {
      return NextResponse.json(
        {
          success: false,
          message: "กรุณาระบุ ID ของผู้ใช้ที่ต้องการลบ",
        },
        { status: 400 }
      );
    }

    const id = String(body.id);

    const userIndex = users.findIndex(
      (user) => user.id === id
    );

    if (userIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
        },
        { status: 404 }
      );
    }

    // เก็บข้อมูลก่อนลบเพื่อส่งกลับ
    const deletedUser = users[userIndex];

    users.splice(userIndex, 1);

    console.log({
      success: true,
      message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
      data: deletedUser,
      status: 200,
    });

    return NextResponse.json(
      {
        success: true,
        message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
        data: deletedUser,
        total: users.length,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
