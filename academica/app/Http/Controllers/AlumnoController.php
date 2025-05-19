<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return alumno::get(); //mostrar todos los alumnos
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Alumno::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Alumno $alumno)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alumno $alumno)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alumno $alumno)
    {
        $alumno::where('codigo_transaccion', $request['codigo_transaccion'])
            ->update([
                'codigo' => $request['codigo'],
                'nombre' => $request['nombre'],
                'direccion' => $request['direccion'],
                'telefono' => $request['telefono'],
                'email' => $request['email'],
                'hash' => $request['hash']
            ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Alumno $alumno)
    {
        $alumno::where('codigo_transaccion', $request['codigo_transaccion'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
