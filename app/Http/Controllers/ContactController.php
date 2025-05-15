<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::latest()->get();
        return Inertia::render('contacts/index', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('contacts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'mobile' => 'required',
            'address' => 'required',
        ]);

        $validatedData['user_id'] = $request->user()->id;
        Contact::create($validatedData);

        return redirect()->route('contacts.index')->with(['success' , 'Contact created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        return Inertia::render('contacts/edit', [
            'contact' => $contact,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'mobile' => 'required|numeric|digits:11|unique:contacts,mobile,' . $contact->id,
            'address' => 'required',
        ]);

        $contact->update($validatedData);

        return redirect()->route('contacts.index')->with(['success' , 'Contact updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contacts.index')->with(['success', 'Contact deleted successfully']);
    }
}
