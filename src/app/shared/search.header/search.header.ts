import { Component } from '@angular/core';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [],
  templateUrl: './search.header.html',
  styleUrl: './search.header.css',
})
export class SearchHeader {

}
// ==================================================
// SEARCH HEADER COMPONENT / FEATURE
// ==================================================

// 1. Interfaces & Types
interface SearchItem {
    id: number;
    title: string;
}

// 2. DOM Elements
const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
const autocomplete = document.getElementById("autocomplete") as HTMLDivElement | null;

// 3. Search Header Handler
function initSearchHeader(items: SearchItem[], onSearch: () => void): void {
    if (!searchInput || !autocomplete) return;

    // Listen to typing in search header
    searchInput.addEventListener("input", (event: Event) => {
        const query: string = (event.target as HTMLInputElement).value.trim().toLowerCase();

        onSearch(); // Trigger main filtering logic

        if (query === "") {
            autocomplete.style.display = "none";
            return;
        }

        // Filter suggestions for header dropdown
        const matches: SearchItem[] = items.filter(item =>
            item.title.toLowerCase().includes(query)
        );

        renderAutocompleteSuggestions(matches, onSearch);
    });

    // Hide dropdown on clicking outside header
    document.addEventListener("click", (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".search-container")) {
            autocomplete.style.display = "none";
        }
    });
}

// 4. Render Autocomplete List
function renderAutocompleteSuggestions(suggestions: SearchItem[], onSelect: () => void): void {
    if (!autocomplete || !searchInput) return;

    autocomplete.innerHTML = "";

    if (suggestions.length === 0) {
        autocomplete.style.display = "none";
        return;
    }

    suggestions.slice(0, 5).forEach((item: SearchItem) => {
        const suggestionDiv: HTMLDivElement = document.createElement("div");
        suggestionDiv.className = "autocomplete-item";
        suggestionDiv.textContent = item.title;

        suggestionDiv.addEventListener("click", () => {
            searchInput.value = item.title;
            autocomplete.style.display = "none";
            onSelect();
        });

        autocomplete.appendChild(suggestionDiv);
    });

    autocomplete.style.display = "block";
}
