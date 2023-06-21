import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../shared/Layout';
import ItemForm from '../shared/ItemForm';
import axios from 'axios';

function ItemEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState({
        title: '',
        link:'',
    })

    // check if it is updated
    const [updated, setUpdated] = useState(false)

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axios(`http://localhost:3000/api/items/`)
                console.log('edit', response)
                setItem(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleChange = (event) => {
        // grab the value from the user input form
        // left side is the key, right side is the value
        const updatedField = {[event.target.name] : event.target.value }
        // assign the empty state with the updated field into one object
        const editedItem = Object.assign(item, updatedField)
        // assign new object to be updated to state
        setItem(editedItem)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        axios({
            url: `http://localhost:3000/api/items/${id}`,
            method: 'PUT',
            data: item
        }).then(() => setUpdated(true)).catch(console.error)
    }
    // if I modify the item, the change will first delete in the local state,
    // 

    useEffect(() => {
        if (updated) {
            return navigate(`/items/${id}`)
        }
    })

    return (
        <Layout>
               <ItemForm 
            item={item}
            handleChange={(e) => handleChange(e)}
            handleSubmit={(e) => handleSubmit(e)}
            cancelPath={`/items/${id}`}
        />
        </Layout>
    )
}

export default ItemEdit;