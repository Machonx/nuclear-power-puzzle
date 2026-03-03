const pieces = document.querySelectorAll('.piece');
const slots = document.querySelectorAll('.slot');
const resetBtn = document.getElementById('resetBtn');
const completionModal = document.getElementById('completionModal');
const playAgainBtn = document.getElementById('playAgainBtn');

let draggedPiece = null;
let correctCount = 0;

function initDragAndDrop() {
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragend', handleDragEnd);
    });

    slots.forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragenter', handleDragEnter);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    draggedPiece = this;
    this.style.opacity = '0.5';
    e.dataTransfer.setData('text/plain', this.dataset.piece);
}

function handleDragEnd() {
    this.style.opacity = '1';
    draggedPiece = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('hover');
}

function handleDragLeave() {
    this.classList.remove('hover');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('hover');

    const pieceName = e.dataTransfer.getData('text/plain');
    const correctPiece = this.dataset.correct;

    if (pieceName === correctPiece) {
        const slotContent = this.querySelector('.slot-content');
        slotContent.innerHTML = draggedPiece.innerHTML;
        this.classList.add('correct');
        draggedPiece.style.display = 'none';
        correctCount++;

        checkCompletion();
    } else {
        // 错误答案，弹回原位
        draggedPiece.style.position = 'relative';
        draggedPiece.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            draggedPiece.style.animation = '';
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
    });

    slots.forEach(slot => {
        slot.classList.remove('correct');
        slot.querySelector('.slot-content').innerHTML = '';
    });

    completionModal.classList.remove('show');
    correctCount = 0;

    // 打乱拼图顺序
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

// 初始化游戏
initDragAndDrop();
shufflePieces();

// 添加摇晃动画
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);