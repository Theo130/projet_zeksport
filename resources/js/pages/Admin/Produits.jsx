import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function AdminProduits({ produits, flash }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Formulaire pour créer/modifier un produit
  const { data, setData, post, put, processing, errors, reset } = useForm({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    categorie: '',
    souscategorie: '',
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Modification
      put(route('admin.produits.update', editingProduct.id), {
        preserveScroll: true,
        onSuccess: () => {
          setShowForm(false);
          setEditingProduct(null);
          reset();
        },
      });
    } else {
      // Création
      post(route('admin.produits.store'), {
        preserveScroll: true,
        onSuccess: () => {
          setShowForm(false);
          reset();
        },
      });
    }
  };

  const handleEdit = (produit) => {
    setEditingProduct(produit);
    setData({
      nom: produit.nom,
      description: produit.description,
      prix: produit.prix,
      stock: produit.stock,
      categorie: produit.categorie || '',
      souscategorie: produit.souscategorie || '',
      image: produit.image || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id, nom) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${nom}" ?`)) {
      router.delete(route('admin.produits.destroy', id), {
        preserveScroll: true,
      });
    }
  };

  const annulerFormulaire = () => {
    setShowForm(false);
    setEditingProduct(null);
    reset();
  };

  return (
    <MainLayout>
      <Head title="Gestion des produits - Admin ZEK Sport" />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📦 Gestion des produits
              </h1>
              <p className="text-gray-600">
                Gérez votre catalogue de produits ZEK Sport
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link 
                href={route('admin')} 
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                ← Retour admin
              </Link>
              
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  ➕ Ajouter un produit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages de succès/erreur */}
        {flash?.success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {flash.success}
          </div>
        )}

        {flash?.error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {flash.error}
          </div>
        )}

        {/* Formulaire d'ajout/modification */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingProduct ? '✏️ Modifier le produit' : '➕ Ajouter un nouveau produit'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    value={data.nom}
                    onChange={e => setData('nom', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.nom ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.nom && <p className="text-sm text-red-500 mt-1">{errors.nom}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix (€) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={data.prix}
                    onChange={e => setData('prix', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.prix ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.prix && <p className="text-sm text-red-500 mt-1">{errors.prix}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    value={data.stock}
                    onChange={e => setData('stock', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.stock ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.stock && <p className="text-sm text-red-500 mt-1">{errors.stock}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={data.categorie}
                    onChange={e => setData('categorie', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Chaussures, Vêtements..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-catégorie
                  </label>
                  <input
                    type="text"
                    value={data.souscategorie}
                    onChange={e => setData('souscategorie', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Basketball, Football..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    value={data.image}
                    onChange={e => setData('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={annulerFormulaire}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {processing ? 'Enregistrement...' : (editingProduct ? 'Modifier' : 'Créer')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des produits */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Liste des produits ({produits.length})
            </h2>
          </div>

          {produits.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg mb-2">📦 Aucun produit trouvé</p>
              <p>Commencez par ajouter votre premier produit !</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {produits.map((produit) => (
                    <tr key={produit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {produit.image && (
                            <img
                              src={produit.image}
                              alt={produit.nom}
                              className="w-12 h-12 object-cover rounded-lg mr-4"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {produit.nom}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {produit.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {produit.prix} €
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          produit.stock > 10 
                            ? 'bg-green-100 text-green-800' 
                            : produit.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {produit.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>
                          {produit.categorie?.nom || 'Non définie'}
                        </div>
                        {produit.souscategorie && (
                          <div className="text-xs text-gray-500">
                            {produit.souscategorie.nom}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(produit)}
                            className="text-blue-600 hover:text-blue-900 transition"
                          >
                            ✏️ Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(produit.id, produit.nom)}
                            className="text-red-600 hover:text-red-900 transition"
                          >
                            🗑️ Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}