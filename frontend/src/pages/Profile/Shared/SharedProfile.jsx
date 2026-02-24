import React from 'react';
import { useProfile } from './ProfileContext';
import { Mail, Phone, Award, MessageCircle, Send } from 'lucide-react';

const SharedProfile = () => {
    const { profile } = useProfile();

    if (!profile) return <div>Loading Profile...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-24 md:h-28 bg-gray-900 text-white flex items-center justify-center font-black text-4xl md:text-6xl lg:text-8xl uppercase px-4 text-center">
                    {profile.bannerText || 'SYNC'}
                </div>
                <div className="px-8 pb-8">
                    <div className="relative flex items-end -mt-12 mb-6">
                        <img
                            src={profile.avatar || "/clubprofiles/ns.png"}
                            alt={profile.name}
                            className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow-sm"
                        />
                        <div className="ml-6 mt-12">
                            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                            <p className="text-gray-500 text-sm">{profile.role}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    {profile.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    {profile.phone}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Bio</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {profile.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-gray-900" />
                    Club Memberships & Communities
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {profile.clubs?.map((club) => (
                        <div key={club.id} className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col h-full">
                            <div className="mb-4">
                                <div className="h-16 w-16 mb-4">
                                    <img src={club.logo} alt={club.name} className="h-full w-full object-contain" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 transition-colors">
                                    {club.name}
                                </h3>
                                <p className="text-sm font-medium text-blue-600 mt-1 mb-2">
                                    {club.role}
                                </p>
                                <p className="text-sm text-gray-500 leading-snug">
                                    {club.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
                                <a
                                    href={club.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
                                >
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    WhatsApp
                                </a>
                                <a
                                    href={club.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-sky-50 text-sky-700 text-xs font-medium hover:bg-sky-100 transition-colors"
                                >
                                    <Send className="h-3.5 w-3.5" />
                                    Telegram
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SharedProfile;
