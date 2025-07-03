import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.organisasi.findMany({
        orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk, pembina } = await request.json();
    if (!nama_organisasi || !ketua_organisasi || !no_kontak || !tahun_dibentuk || !pembina) {
        return new Response(JSON.stringify({ error: 'All Fields Are Required' }), {
            status: 400,
        });
    }
    const organisasi = await prisma.organisasi.create({
        data: { nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk: Number(tahun_dibentuk), pembina },
    });
    return new Response(JSON.stringify(organisasi), { status: 201 });
}

export async function PUT(request) {
    const { id, nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk, pembina } = await request.json();
    if (!id || !nama_organisasi || !ketua_organisasi || !no_kontak || !tahun_dibentuk || !pembina) {
        return Response.json({ error: 'Field is Empty' }, { status: 400 });
    }
    const organisasi = await prisma.organisasi.update({
        where: { id },
        data: { nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk: Number(tahun_dibentuk), pembina },
    });
    return Response.json(organisasi);
}

export async function DELETE(request) {
    const { id } = await request.json();
    if (!id) return Response.json({ error: 'ID Not Found' }, { status: 400 });
    await prisma.organisasi.delete({ where: { id } });
    return Response.json({ message: 'Deleted Successfully' });
}  