import "./style.css";
// import 'bootstrap/dist/css/bootstrap.css'

function AddBookPage() {
    async function handleCreate() {
        console.log({
            book_id: null,
            title: document.getElementById("title").value,
            genre: document.getElementById("genre").value,
            author: document.getElementById("author").value,
            detail: document.getElementById("description").value,
            coverUrl: document.getElementById("file").value,
        });
        const response = await fetch(`http://127.0.0.1:8000/add-book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                book_id: null,
                title: document.getElementById("title").value,
                genre: document.getElementById("genre").value,
                author: document.getElementById("author").value,
                detail: document.getElementById("description").value,
                coverUrl: document.getElementById("file").value,
            }),
        });
        if (response.status === 201) {
            alert("already created");
            window.location.reload()
        } else {
            let data = await response.json();
            alert(data.error);
        }
    }
    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <h1 className="text-blue fs-26 fw-5 center">Add New Catalog</h1>
            <div className="create-box">
                <div style={{ marginLeft: "50px", marginBottom: "10px" }}>
                    <label style={{ marginRight: "14px" }}>CoverUrl</label>
                    <br></br>
                    <input id="file" type="text" className="fs-20 fw-4 text-field" />
                </div>
                <div style={{ marginLeft: "50px", marginBottom: "10px" }}>
                    <label style={{ marginRight: "14px" }}>Name</label>
                    <br></br>
                    <input
                        id="title"
                        type="text"
                        className="fs-20 fw-4 text-field"
                        placeholder="ex. Alice in wonderland"
                    />
                </div>
                <div style={{ marginLeft: "50px", marginBottom: "10px" }}>
                    <label style={{ marginRight: "14px" }}>Author</label>
                    <br></br>
                    <input id="author" type="text" className="fs-20 fw-4 text-field" placeholder="ex. Austin Butler" />
                </div>
                <div style={{ marginLeft: "50px", marginBottom: "10px" }}>
                    <label style={{ marginRight: "14px" }}>Genre</label>
                    <br></br>
                    <input id="genre" type="text" className="fs-20 fw-4 text-field" placeholder="ex. Academic" />
                </div>
                <div style={{ marginLeft: "50px", marginBottom: "10px" }}>
                    <label style={{ marginRight: "14px" }}>description</label>
                    <br></br>
                    <textarea id="description" className="fs-20 fw-4 text-field" placeholder="This book is about...." />
                </div>

                <label
                    className="menu-button text-white fs-18 fw-5"
                    style={{ marginLeft: "550px" }}
                    onClick={handleCreate}
                >
                    สร้าง
                </label>
            </div>
        </div>
    );
}

export default AddBookPage;
