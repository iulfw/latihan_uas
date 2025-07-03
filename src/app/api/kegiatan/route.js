import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.kegiatan.findMany({
        orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { judul_kegiatan, id_organisasi, tanggal_kegiatan, lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran } = await request.json();
    if (!judul_kegiatan || !id_organisasi || !tanggal_kegiatan || !lokasi || !jenis_kegiatan || !deskripsi_singkat) {
        return new Response(JSON.stringify({ error: 'All Fields Are Required' }), {
            status: 400,
        });
    }
    const kegiatan = await prisma.kegiatan.create({
        data: { judul_kegiatan, id_organisasi: Number(id_organisasi), tanggal_kegiatan: new Date(tanggal_kegiatan), lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran },
    });
    return new Response(JSON.stringify(kegiatan), { status: 201 });
}

export async function PUT(request) {
    const { id, judul_kegiatan, id_organisasi, tanggal_kegiatan, lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran } = await request.json();
    if (!id || !judul_kegiatan || !id_organisasi || !tanggal_kegiatan || !lokasi || !jenis_kegiatan || !deskripsi_singkat) {
        return Response.json({ error: 'Field is Empty' }, { status: 400 });
    }
    const kegiatan = await prisma.kegiatan.update({
        where: { id },
        data: { judul_kegiatan, id_organisasi: Number(id_organisasi), tanggal_kegiatan: new Date(tanggal_kegiatan), lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran },
    });
    return Response.json(kegiatan);
}

export async function DELETE(request) {
    const { id } = await request.json();
    if (!id) return Response.json({ error: 'ID Not Found' }, { status: 400 });
    await prisma.kegiatan.delete({ where: { id } });
    return Response.json({ message: 'Deleted Successfully' });
}  