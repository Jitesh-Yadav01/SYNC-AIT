import React, { useState } from 'react';
import { useTe } from './TeContext';
import { Plus, Trash2, Search, Pencil } from 'lucide-react';

export default function TeMembers() {
    const { members, addMember, removeMember, editMember } = useTe();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMemberId, setCurrentMemberId] = useState(null);
    const [newMember, setNewMember] = useState({ name: '', email: '', role: 'FE', domain: '', status: 'Active' });

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMember.name && newMember.email && newMember.domain) {
            if (isEditing) {
                editMember({ ...newMember, id: currentMemberId });
                setIsEditing(false);
                setCurrentMemberId(null);
            } else {
                addMember(newMember);
            }
            setShowAddForm(false);
            setNewMember({ name: '', email: '', role: 'FE', domain: '', status: 'Active' });
        }
    };

    const openEditModal = (member) => {
        setNewMember({
            name: member.name,
            email: member.email,
            role: member.role,
            domain: member.domain,
            status: member.status
        });
        setCurrentMemberId(member.id);
        setIsEditing(true);
        setShowAddForm(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Team Members</h2>
                    <p className="text-gray-500">Manage your FE and SE team members.</p>
                </div>
                <button
                    onClick={() => {
                        setShowAddForm(!showAddForm);
                        setIsEditing(false);
                        setNewMember({ name: '', email: '', role: 'FE', domain: '', status: 'Active' });
                    }}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                    <Plus className="h-4 w-4" /> {showAddForm && !isEditing ? 'Close' : 'Add Member'}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
                    <h3 className="font-semibold text-lg text-gray-900">{isEditing ? 'Edit Member' : 'Add New Member'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                            value={newMember.name}
                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                            required
                        />
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                            value={newMember.email}
                            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                            required
                        />
                        <select
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newMember.role}
                            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        >
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                        </select>
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Domain (e.g. Frontend)"
                            value={newMember.domain}
                            onChange={(e) => setNewMember({ ...newMember, domain: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setShowAddForm(false);
                                setIsEditing(false);
                                setNewMember({ name: '', email: '', role: 'FE', domain: '', status: 'Active' });
                            }}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            {isEditing ? 'Update Member' : 'Save Member'}
                        </button>
                    </div>
                </form>
            )}

            {/* List */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">All Members</h3>
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            className="pl-8 flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm text-gray-900 shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    {filteredMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium border border-blue-100">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">{member.role}</span>
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">{member.domain}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${member.status === 'Active'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-gray-50 text-gray-500 border-gray-200'
                                    }`}>
                                    {member.status}
                                </span>
                                <button
                                    onClick={() => openEditModal(member)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => removeMember(member.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredMembers.length === 0 && (
                        <div className="p-8 text-center text-gray-500">No members found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
