'use client'
import { FileText, FileTextIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface FormData {
    name: string,
    file: File | null
}

const CreatePage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        file: null
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        setFormData((prev) => ({ ...prev, file }));

        if (file && file.type === "application/pdf") {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null); // pastikeun ngan PDF nu bisa dipreview
        }
    };

    return (
        <main className="p-6">
            <h1 className="text-accent-dark text-sm mb-5">Curiculum Vitae</h1>
            <div className="mb-8">
                <div className="flex items-center space-x-2 font-extrabold text-accent">
                    <FileText className="w-5 h-5" />
                    <h2 className="text-2xl">Curiculum Vitae</h2>
                </div>
            </div>

            <div className="bg-white rounded-2xl space-y-6 p-6 text-black">
                <div className="flex space-x-5">
                    <div className="bg-accent/30 p-2 rounded-full w-10 h-10 my-auto">
                        <FileTextIcon />
                    </div>
                    <div>
                        <h1 className="text-xl text-gray-800 font-extrabold">Tambah CV</h1>
                        <span className="text-sm text-gray-300">Silahkan isi semua informasi yang dibutuhkan</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="name">Nama CV</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full p-2 border rounded-lg pr-12 focus:ring-2 outline-none transition-colors bg-gray-200 focus:border-accent border-gray-300"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                </div>

                <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV</label>
                    <div className="relative">
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {previewUrl ? (
                                <embed
                                    src={previewUrl}
                                    type="application/pdf"
                                    width="100%"
                                    height="500px"
                                    className="pointer-events-none"
                                />
                            ) : (
                                <p className="text-sm text-gray-500">Klik di sini untuk upload PDF</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default CreatePage;
