"use client";
import styles from './organisasi.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function organisasi() {
  
  const [ formVisible, setFormVisible ] = useState(false);
  const [ organisasis, setorganisasis ] = useState([]);
  const [ nama_organisasi, setNamaOrganisasi ] = useState('');
  const [ ketua_organisasi, setKetuaOrganisasi ] = useState('');
  const [ no_kontak, setNoKontak ] = useState('');
  const [ tahun_dibentuk, setTahunDibentuk ] = useState('');
  const [ pembina, setPembina ] = useState('');
  const [ msg, setMsg ] = useState('');
  const [ editId, setEditId ] = useState(null);

  const router = useRouter();
  const handleChange = (e) => {
    const path = e.target.value;
    if (path) router.push(path);
  };

  const fetchorganisasis = async () => {
    const res = await fetch('/api/organisasi');
    const data = await res.json();
    setorganisasis(data);
  };

  useEffect(() => {
    fetchorganisasis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/organisasi', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, nama_organisasi, ketua_organisasi, no_kontak, tahun_dibentuk, pembina }),
    });

    if (res.ok) {
        setMsg('Saved Successfully!');
        setNamaOrganisasi('');
        setKetuaOrganisasi('');
        setNoKontak('');
        setTahunDibentuk('');
        setPembina('');
        setEditId(null);
        setFormVisible(false);
        fetchorganisasis();
    } else {
        setMsg('Failed to Save Data!');
    }
    };

  const handleEdit = (item) => {
    setNamaOrganisasi(item.nama_organisasi);
    setKetuaOrganisasi(item.ketua_organisasi);
    setNoKontak(item.no_kontak);
    setTahunDibentuk(item.tahun_dibentuk);
    setPembina(item.pembina);
    setEditId(item.id);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda Yakin?')) return;
    await fetch('/api/organisasi', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchorganisasis();
  };

  return (
    <div className={styles.container}>
      <select onChange={handleChange} value="/organisasi" className={styles.dropdownNavigate}>
        <option value="">Organisasi</option>
        <option value="/kegiatan">Kegiatan</option>
      </select>
      <h1 className={styles.title}>Portal Ormawa ITBSS</h1>
      <h2 className={styles.subtitle}>Daftar Organisasi</h2>
      <button
           className={styles.buttonToggle}
           onClick={() => setFormVisible(!formVisible)}>
           {formVisible ? 'Tutup Form' : 'Tambah Data'}
      </button>

      {formVisible && (
        <div className={styles.formWrapper}>
          <h3>Tambah Organisasi</h3>
          <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
              <span>Nama Organisasi</span>
              <input
                type="text"
                value={nama_organisasi}
                onChange={(e) => setNamaOrganisasi(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <span>Ketua Organisasi</span>
              <input
                type="text"
                value={ketua_organisasi}
                onChange={(e) => setKetuaOrganisasi(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <span>Nomor Kontak</span>
              <input
                type="text"
                value={no_kontak}
                onChange={(e) => setNoKontak(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <span>Tahun Dibentuk</span>
              <input
                type="number"
                value={tahun_dibentuk}
                onChange={(e) => setTahunDibentuk(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <span>Pembina</span>
              <input
                type="text"
                value={pembina}
                onChange={(e) => setPembina(e.target.value)}
                required
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
              <th>Nama Organisasi</th>
              <th>Ketua</th>
              <th>No. Kontak</th>
              <th>Tahun Dibentuk</th>
              <th>Pembina</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {organisasis.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama_organisasi}</td>
                  <td>{item.ketua_organisasi}</td>
                  <td>{item.no_kontak}</td>
                  <td>{item.tahun_dibentuk}</td>
                  <td>{item.pembina}</td>
                  <td>
                    <button style={{ marginRight: '5px' }} onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
              {organisasis.length === 0 && (
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