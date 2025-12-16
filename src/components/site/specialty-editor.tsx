"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconPicker, DynamicIcon } from "@/components/ui/icon-picker";
import { Specialty } from "@/types/specialty";

interface SpecialtyEditorProps {
    specialties: Specialty[];
    onChange: (specialties: Specialty[]) => void;
    onSave: () => void;
    isSaving: boolean;
    primaryColor?: string;
}

export function SpecialtyEditor({
    specialties,
    onChange,
    onSave,
    isSaving,
    primaryColor = "#6366f1",
}: SpecialtyEditorProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Specialty>({
        name: "",
        description: "",
        icon: "heart",
    });

    const openAddModal = () => {
        setEditingIndex(null);
        setEditForm({ name: "", description: "", icon: "heart" });
        setIsModalOpen(true);
    };

    const openEditModal = (index: number) => {
        setEditingIndex(index);
        setEditForm({ ...specialties[index] });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!editForm.name.trim()) return;

        if (editingIndex !== null) {
            // Editando existente
            const newSpecialties = [...specialties];
            newSpecialties[editingIndex] = editForm;
            onChange(newSpecialties);
        } else {
            // Adicionando nova
            onChange([...specialties, editForm]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (index: number) => {
        const newSpecialties = specialties.filter((_, i) => i !== index);
        onChange(newSpecialties);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Suas especialidades
                </label>
                <p className="text-sm text-gray-500 mb-4">
                    Adicione as áreas em que você atua com ícone e descrição personalizados.
                </p>

                {/* Lista de especialidades */}
                <div className="space-y-3 mb-4">
                    {specialties.map((specialty, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                        >
                            {/* Ícone */}
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: primaryColor + "15" }}
                            >
                                <DynamicIcon
                                    name={specialty.icon}
                                    className="w-5 h-5"
                                    style={{ color: primaryColor }}
                                />
                            </div>

                            {/* Conteúdo */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900">
                                    {specialty.name}
                                </h4>
                                {specialty.description && (
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                        {specialty.description}
                                    </p>
                                )}
                            </div>

                            {/* Ações */}
                            <div className="flex gap-1 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => openEditModal(index)}
                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                    title="Editar"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(index)}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Remover"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}

                    {specialties.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 mb-2">Nenhuma especialidade adicionada</p>
                            <Button variant="outline" size="sm" onClick={openAddModal}>
                                Adicionar primeira especialidade
                            </Button>
                        </div>
                    )}
                </div>

                {/* Botão Adicionar */}
                {specialties.length > 0 && (
                    <Button variant="outline" onClick={openAddModal}>
                        + Adicionar especialidade
                    </Button>
                )}
            </div>

            {/* Botão Salvar */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button onClick={onSave} isLoading={isSaving}>
                    Salvar Especialidades
                </Button>
            </div>

            {/* Modal de Edição */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {editingIndex !== null ? "Editar especialidade" : "Nova especialidade"}
                        </h3>

                        <div className="space-y-4">
                            {/* Nome */}
                            <Input
                                label="Nome da especialidade"
                                placeholder="Ex: Ansiedade, Depressão..."
                                value={editForm.name}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, name: e.target.value })
                                }
                            />

                            {/* Ícone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ícone
                                </label>
                                <IconPicker
                                    value={editForm.icon}
                                    onChange={(icon) =>
                                        setEditForm({ ...editForm, icon })
                                    }
                                    primaryColor={primaryColor}
                                />
                            </div>

                            {/* Descrição */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descrição (opcional)
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900"
                                    rows={3}
                                    placeholder="Descreva brevemente esta especialidade..."
                                    value={editForm.description}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, description: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button onClick={handleSave} disabled={!editForm.name.trim()}>
                                {editingIndex !== null ? "Salvar" : "Adicionar"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
