import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function AdminUtilisateurs({ utilisateurs = [], auth }) {

  // Changer le rôle d'un utilisateur
  const changerRole = (userId, newRole) => {
    if (confirm(`Changer le rôle en "${newRole}" ?`)) {
      router.put(route('admin2.changer-role', userId), {
        role: newRole
      });
    }
  };

  // Supprimer un utilisateur
  const supprimerUtilisateur = (user) => {
    if (confirm(`Supprimer l'utilisateur "${user.prenom} ${user.nom}" ?`)) {
      router.delete(route('admin2.supprimer', user.id));
    }
  };

  return (
    <MainLayout>
      <Head title="Gestion des utilisateurs" />
      
      <div className="max-w-6xl mx-auto p-6">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Gestion des utilisateurs
              </h1>
              <p className="text-gray-600">
                Liste des utilisateurs - {utilisateurs.length} au total
              </p>
            </div>
            
            <Link 
              href={route('admin')} 
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              ← Retour admin
            </Link>
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Téléphone</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Rôle</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date création</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {utilisateurs.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {user.prenom} {user.nom}
                      {user.id === auth?.user?.id && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Vous
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.telephone}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Client'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.date_creation).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* Changer rôle */}
                      {user.id !== auth?.user?.id && (
                        <select
                          value={user.role}
                          onChange={(e) => changerRole(user.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="client">Client</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                      
                      {/* Supprimer */}
                      {user.id !== auth?.user?.id && (
                        <button
                          onClick={() => supprimerUtilisateur(user)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}