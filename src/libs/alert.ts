import Swal from "sweetalert2";

export const alertSuccess = async (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: message,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Tutup",
  });
};

export const alertError = async (message: string) => {
  return Swal.fire({
    icon: "error",
    title: "Gagal",
    text: message,
    confirmButtonColor: "#d33",
    confirmButtonText: "Tutup",
  });
};

export const alertConfirm = async (message: string) => {
  const result = await Swal.fire({
    icon: "question",
    title: "Apakah Anda yakin?",
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
  return result.isConfirmed;
};
