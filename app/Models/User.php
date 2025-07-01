<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /** ───────── Table & clés ───────── */
    protected $table      = 'utilisateurs';   // <- ta table MySQL
    protected $primaryKey = 'id';
    public    $incrementing = true;
    protected $keyType    = 'int';

    /** ───────── Timestamps ─────────── */
    public $timestamps = true;
    const CREATED_AT = 'date_creation';
    const UPDATED_AT = null;                 // pas de updated_at

    /** ───────── Remplissage ────────── */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'role',
        'mot_de_passe',
    ];

    /** ───────── JSON hidden ────────── */
    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    /** ───────── Auth password field ─ */
public function getAuthPassword()
{
    return $this->mot_de_passe;
}
}
