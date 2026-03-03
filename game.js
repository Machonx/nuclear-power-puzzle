const pieces = document.querySelectorAll('.piece');
const slots = document.querySelectorAll('.slot');
const resetBtn = document.getElementById('resetBtn');
const completionModal = document.getElementById('completionModal');
const playAgainBtn = document.getElementById('playAgainBtn');

let selectedPiece = null;
let correctCount = 0;

function initClickGame() {
    pieces.forEach(piece => {
        piece.addEventListener('click', handlePieceClick);
    });

    slots.forEach(slot => {
        slot.addEventListener('click', handleSlotClick);
    });
}

function handlePieceClick() {
    if (this.style.display === 'none') return;

    pieces.forEach(p => p.classList.remove('selected'));
    
    if (selectedPiece === this) {
        selectedPiece = null;
    } else {
        selectedPiece = this;
        this.classList.add('selected');
    }
}

function handleSlotClick() {
    if (!selectedPiece) return;
    if (this.classList.contains('correct')) return;

    const pieceName = selectedPiece.dataset.piece;
    const correctPiece = this.dataset.correct;

    if (pieceName === correctPiece) {
        const slotContent = this.querySelector('.slot-content');
        slotContent.innerHTML = selectedPiece.innerHTML;
        this.classList.add('correct');
        selectedPiece.style.display = 'none';
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        correctCount++;

        checkCompletion();
    } else {
        this.classList.add('wrong');
        setTimeout(() => {
            this.classList.remove('wrong');
        }, 500);
    }
}

function checkCompletion() {
    if (correctCount === slots.length) {
        setTimeout(() => {
            completionModal.classList.add('show');
        }, 500);
    }
}

function resetGame() {
    pieces.forEach(piece => {
        piece.style.display = 'block';
        piece.classList.remove('selected');
    });

    slots.forEach(slot => {
        slot.classList.remove('correct', 'wrong');
        slot.querySelector('.slot-content').innerHTML = '';
    });

    completionModal.classList.remove('show');
    selectedPiece = null;
    correctCount = 0;

    shufflePieces();
}

function shufflePieces() {
    const puzzlePieces = document.querySelector('.puzzle-pieces');
    const piecesArray = Array.from(puzzlePieces.children);
    
    piecesArray.sort(() => Math.random() - 0.5);
    
    piecesArray.forEach(piece => {
        puzzlePieces.appendChild(piece);
    });
}

resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

initClickGame();
shufflePieces();
