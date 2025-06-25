<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class InscriptionController extends Controller
{
    public function show()
    {
      return Inertia::render('pages/Inscription');
    }
}
