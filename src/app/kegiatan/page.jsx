"use client";
import styles from './kegiatan.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function kegiatan() {
  const [ formVisible, setFormVisible ] = useState(false);
  const [ kegiatans, setkegiatans ] = useState([]);
  const [ organisasis, setorganisasis ] = useState([]);
  const [ judul_kegiatan, setJudulKegiatan ] = useState('');
  const [ id_organisasi, setIdOrganisasi ] = useState('');
  const [ tanggal_kegiatan, setTanggalKegiatan ] = useState('');
  const [ lokasi, setLokasi ] = useState('');
  const [ jenis_kegiatan, setJenisKegiatan ] = useState('');
  const [ deskripsi_singkat, setDeskripsiSingkat ] = useState('');
  const [ tautan_pendaftaran, setTautanPendaftaran ] = useState('');
  const [ msg, setMsg ] = useState('');
  const [ editId, setEditId ] = useState(null);

  const router = useRouter();
  const handleChange = (e) => {
    const path = e.target.value;
    if (path) router.push(path);
  };

  const fetchkegiatans = async () => {
    const res = await fetch('/api/kegiatan');
    const data = await res.json();
    setkegiatans(data);
  };

  const fetchorganisasis = async () => {
    const res = await fetch('/api/organisasi');
    const data = await res.json();
    setorganisasis(data);
  };

  useEffect(() => {
    fetchkegiatans();
    fetchorganisasis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/kegiatan', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, judul_kegiatan, id_organisasi, tanggal_kegiatan, lokasi, jenis_kegiatan, deskripsi_singkat, tautan_pendaftaran }),
    });

    if (res.ok) {
      setMsg('Saved Successfully!');
      setJudulKegiatan('');
      setIdOrganisasi('');
      setTanggalKegiatan('');
      setLokasi('');
      setJenisKegiatan('');
      setDeskripsiSingkat('');
      setTautanPendaftaran('');
      setEditId(null);
      setFormVisible(false);
      fetchkegiatans();
    } else {
      setMsg('Failed to Save Data!');
    }
  };

  const handleEdit = (item) => {
      setJudulKegiatan(item.judul_kegiatan);
      setIdOrganisasi(item.id_organisasi);
      setTanggalKegiatan(item.tanggal_kegiatan);
      setLokasi(item.lokasi);
      setJenisKegiatan(item.jenis_kegiatan);
      setDeskripsiSingkat(item.deskripsi_singkat);
      setTautanPendaftaran(item.tautan_pendaftaran);
      setEditId(item.id);
      setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda Yakin?')) return;
    await fetch('/api/kegiatan', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchkegiatans();
  };

  return (
    <div className={styles.container}>
        <select onChange={handleChange} className={styles.dropdownNavigate}>
          <option value="">Kegiatan</option>
          <option value="/organisasi">Organisasi</option>
        </select>
        <h1 className={styles.title}>Portal Ormawa ITBSS</h1>
        <h2 className={styles.subtitle}>Daftar Kegiatan</h2>
        <button
            className={styles.buttonToggle}
            onClick={() => setFormVisible(!formVisible)}>
            {formVisible ? 'Tutup Form' : 'Tambah Data'}
        </button>
        
        {formVisible && (
            <div className={styles.formWrapper}>
                <h3>Tambah Kegiatan</h3>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <span>Nama Kegiatan</span>
                    <input
                    type="text"
                    value={judul_kegiatan}
                    onChange={(e) => setJudulKegiatan(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Organisasi</span>
                    <select 
                        value={id_organisasi}
                        onChange={(e) => setIdOrganisasi(e.target.value)}
                        required
                    >
                        <option value="">Pilih Organisasi</option>
                        {organisasis.map((organisasi) => (
                          <option key={organisasi.id} value={organisasi.id}>
                            {organisasi.nama_organisasi}
                          </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <span>Tanggal Kegiatan</span>
                    <input
                    type="date"
                    value={tanggal_kegiatan}
                    onChange={(e) => setTanggalKegiatan(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Lokasi Kegiatan</span>
                    <input
                    type="text"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Jenis Kegiatan</span>
                    <input
                    type="text"
                    value={jenis_kegiatan}
                    onChange={(e) => setJenisKegiatan(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Deskripsi Singkat</span>
                    <input
                    type="text"
                    value={deskripsi_singkat}
                    onChange={(e) => setDeskripsiSingkat(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formGroup}>
                    <span>Tautan Pendaftaran</span>
                    <input
                    type="text"
                    value={tautan_pendaftaran}
                    onChange={(e) => setTautanPendaftaran(e.target.value)}
                    />
                </div>
                <button type="submit">
                    Kirim
                </button>
                <p>{msg}</p>
                </form>
            </div>
        )}

        <div className={styles.tableWrapper}>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Kegiatan</th>
                    <th>Organisasi</th>
                    <th>Tanggal</th>
                    <th>Lokasi</th>
                    <th>Jenis</th>
                    <th>Deskripsi</th>
                    <th>Tautan</th>
                </tr>
                </thead>
                <tbody>
                    {kegiatans.map((item, index) => (
                        <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.judul_kegiatan}</td>
                        <td>{item.organisasi?.nama_organisasi}</td>
                        <td>{new Date(item.tanggal_kegiatan).toLocaleDateString('en-GB')}</td>
                        <td>{item.lokasi}</td>
                        <td>{item.jenis_kegiatan}</td>
                        <td>{item.deskripsi_singkat}</td>
                        <td>{item.tautan_pendaftaran}</td>
                        <td>
                          <button style={{ marginRight: '5px' }} onClick={() => handleEdit(item)}>Edit</button>
                          <button onClick={() => handleDelete(item.id)}>Hapus</button>
                        </td>
                        </tr>
                    ))}
                    {kegiatans.length === 0 && (
                        <tr>
                        <td colSpan="9">Data Tidak Tersedia</td>
                        </tr>
                    )}
                </tbody>
            </table>    
        </div>
    </div>
  );
}