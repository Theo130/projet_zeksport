import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function AdminProduits({ produits = [], categories = [], subcategories = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  // Formulaire pour ajouter/modifier
  const { data, setData, post, put, processing, errors, reset } = useForm({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    image_url: '',
    id_categorie: '',
    id_subcategorie: ''
  });

  // Ouvrir modal pour ajouter
  const openAddModal = () => {
    reset();
    setEditingProduct(null);
    setFilteredSubcategories([]);
    setShowModal(true);
  };

  // Ouvrir modal pour modifier
  const openEditModal = (produit) => {
    setEditingProduct(produit);
    setData({
      nom: produit.nom,
      description: produit.description,
      prix: produit.prix,
      stock: produit.stock,
      image_url: produit.image_url || '',
      id_categorie: produit.id_categorie,
      id_subcategorie: produit.id_subcategorie
    });

    // Filtrer les sous-catégories selon la catégorie sélectionnée
    if (produit.id_categorie) {
      const filtered = subcategories.filter(sub => sub.id_categorie == produit.id_categorie);
      setFilteredSubcategories(filtered);
    }

    setShowModal(true);
  };

  // Gérer le changement de catégorie
  const handleCategoryChange = (categoryId) => {
    setData('id_categorie', categoryId);
    setData('id_subcategorie', ''); // reset sous-catégorie
    const filtered = subcategories.filter(sub => sub.id_categorie == categoryId);
    setFilteredSubcategories(filtered);
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Petit contrôle rapide avant envoi
    if (!data.id_subcategorie) {
      alert("Tu as oublié de sélectionner la sous-catégorie !");
      return;
    }

    if (editingProduct) {
      // Modification
      put(route('admin.produits.update', editingProduct.id), {
        onSuccess: () => {
          setShowModal(false);
          reset();
        }
      });
    } else {
      // Ajout
      post(route('admin.produits.store'), {
        onSuccess: () => {
          setShowModal(false);
          reset();
        }
      });
    }
  };

  // Supprimer un produit
  const handleDelete = (produit) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${produit.nom}" ?`)) {
      router.delete(route('admin.produits.destroy', produit.id));
    }
  };

  return (
    <MainLayout>
      <Head title="Gestion des produits - Admin" />

      <div className="max-w-7xl mx-auto p-6">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Gestion des produits
              </h1>
              <p className="text-gray-600">
                Ajoutez, modifiez et gérez tous vos produits
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href={route('admin')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                ← Retour admin
              </Link>

              <button
                onClick={openAddModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Ajouter un produit
              </button>
            </div>
          </div>
        </div>

        {/* Liste des produits */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Liste des produits ({produits.length})
            </h2>
          </div>

          {produits.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg mb-4">Aucun produit trouvé</p>
              <button
                onClick={openAddModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Ajouter votre premier produit
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {produits.map((produit) => (
                    <tr key={produit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {produit.image_url ? (
                          <img
                            src={produit.image_url}
                            alt={produit.nom}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">Pas d'image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{produit.nom}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {produit.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-lg font-semibold text-green-600">
                        {produit.prix} €
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          produit.stock > 10
                            ? 'bg-green-100 text-green-800'
                            : produit.stock > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {produit.stock} en stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {produit.categorie?.nom}
                        {produit.subcategorie && (
                          <div className="text-xs text-gray-400">
                            {produit.subcategorie.nom}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(produit)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(produit)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm"
                          >
                            Supprimer
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

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* 🚨 Message d’erreur global pour la sous-catégorie */}
              {errors.id_subcategorie && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-red-800">
                  {errors.id_subcategorie}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    value={data.nom}
                    onChange={e => setData('nom', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Maillot de football Nike"
                    required
                  />
                  {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description détaillée du produit..."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Prix et Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (€) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={data.prix}
                      onChange={e => setData('prix', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="29.99"
                      required
                    />
                    {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={data.stock}
                      onChange={e => setData('stock', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50"
                      required
                    />
                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                  </div>
                </div>

                {/* URL de l'image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    value={data.image_url}
                    onChange={e => setData('image_url', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://exemple.com/image.jpg"
                  />
                  {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
                </div>

                {/* Catégorie et Sous-catégorie */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie *
                    </label>
                    <select
                      value={data.id_categorie}
                      onChange={e => handleCategoryChange(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nom}</option>
                      ))}
                    </select>
                    {errors.id_categorie && <p className="text-red-500 text-sm mt-1">{errors.id_categorie}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sous-catégorie *
                    </label>
                    <select
                      value={data.id_subcategorie}
                      onChange={e => setData('id_subcategorie', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!data.id_categorie}
                      required
                    >
                      <option value="">Sélectionner une sous-catégorie</option>
                      {filteredSubcategories.map(subcat => (
                        <option key={subcat.id} value={subcat.id}>{subcat.nom}</option>
                      ))}
                    </select>
                    {errors.id_subcategorie && <p className="text-red-500 text-sm mt-1">{errors.id_subcategorie}</p>}
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {processing ? 'Enregistrement...' : (editingProduct ? 'Modifier' : 'Ajouter')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
 