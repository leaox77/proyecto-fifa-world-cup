import { supabase } from "../lib/supabase";

//obtener figuritas

// select atributo from tabla where alguna especificacion
export async function fetchFiguritas(){
    const {data, error} = await supabase
        .from('figuritas')
        .select('*')
        .order('id', {ascending: true})

    if (error) throw error
    return data
}


// agregar una figurita con imagen

export async function addFigurita(figurita, imagenF) {
    let imagenUrl = figurita.imagen || null
    
    // Si hay imagen, subir a Storage
    if (imagenF && imagenF instanceof File) {
        const fileExt = imagenF.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = fileName
        
        // SUBIR el archivo (esto estaba mal)
        const { error: uploadError } = await supabase.storage
            .from('figuritas')
            .upload(filePath, imagenF)
            
        if (uploadError) throw uploadError
        
        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
            .from('figuritas')
            .getPublicUrl(filePath)
            
        imagenUrl = publicUrl
    }
    
    const { data, error } = await supabase
        .from('figuritas')
        .insert([{
            id: Date.now(),
            ...figurita,
            imagen: imagenUrl
        }])
        .select()
        
    if (error) throw error
    return data[0]
}

export async function updateFigurita(id, updates) {
    const { data, error } = await supabase
        .from('figuritas')
        .update(updates)
        .eq('id', id)
        .select()

    if (error) throw error
    return data[0]
}


export async function deleteFigurita(id) {
    const { error } =  await supabase
        .from('figuritas')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}

//marcar favorita/obtenida

export async function toggleObtenida(id, currentState) {
    return updateFigurita(id, { obtenida: !currentState})
}

export async function toggleFavorita(id, currentState) {
    return updateFigurita(id, { favorita: !currentState})
}