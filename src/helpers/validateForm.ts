// const document = new Document
const title: HTMLInputElement = document.getElementById("title") as HTMLInputElement;
const description = document.getElementById("desctription") as HTMLTextAreaElement | null;
const markdown = document.getElementById("markdown") as HTMLTextAreaElement | null;
const form = document.getElementById('form') as HTMLFormElement | null;

export default function validateForm() {
    form?.addEventListener("submit", (e) =>{
        e.preventDefault()
    });
}