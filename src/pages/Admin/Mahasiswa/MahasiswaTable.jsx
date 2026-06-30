import Button from "@/pages/Admin/Components/Button";
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";
import { usePagination } from "@/utils/Hooks/usePagination";
import Pagination from "@/pages/Admin/Components/Pagination";

const MahasiswaTable = ({
  mahasiswa = [],
  kelas = [],
  mataKuliah = [],
  loading,
  error,
  openEditModal,
  onDelete,
  onDetail,
}) => {
  const { user } = useAuthStateContext();
  const pagination = usePagination(mahasiswa, 5);

  if (loading) {
    return <p className="p-4 text-sm text-slate-500">Loading mahasiswa...</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-600">Gagal memuat data mahasiswa.</p>;
  }

  if (mahasiswa.length === 0) {
    return <p className="p-4 text-sm text-slate-500">Tidak ada mahasiswa.</p>;
  }

  return (
    <>
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIM</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-center">Total SKS</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {pagination.paginatedData.map((mhs, index) => {
          // Hitung SKS
          const mhsIdNumber = Number(mhs.id);
          const mhsClasses = kelas.filter(k => k.mahasiswaIds?.map(Number).includes(mhsIdNumber));
          const totalSks = mhsClasses.reduce((total, k) => {
            const mk = mataKuliah.find(m => Number(m.id) === Number(k.mataKuliahId));
            return total + (mk ? Number(mk.sks) : 0);
          }, 0);

          return (
            <tr
              key={mhs.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4">{mhs.nim}</td>
              <td className="py-2 px-4">{mhs.nama}</td>
              <td className="py-2 px-4 text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${totalSks >= 20 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {totalSks} SKS
                </span>
              </td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button onClick={() => onDetail(mhs.id)}>
                  Detail
                </Button>

                {user?.permission?.includes("mahasiswa.update") && (
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => openEditModal(mhs)}
                  >
                    Edit
                  </Button>
                )}

                {user?.permission?.includes("mahasiswa.delete") && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(mhs.id)}
                  >
                    Hapus
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <Pagination {...pagination} />
    </>
  );
};

export default MahasiswaTable;