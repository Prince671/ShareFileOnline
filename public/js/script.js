
    
        class FileUploader {
            constructor() {
                this.files = [];
                this.uploadZone = document.getElementById('uploadZone');
                this.fileInput = this.createFileInput();
                this.initializeEventListeners();
            }

            createFileInput() {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.style.display = 'none';
                document.body.appendChild(input);
                return input;
            }

            initializeEventListeners() {
                // Click to upload
                this.uploadZone.addEventListener('click', () => {
                    this.fileInput.click();
                });

                // File selection
                this.fileInput.addEventListener('change', (e) => {
                    this.handleFiles(Array.from(e.target.files));
                });

                // Drag and drop
                this.uploadZone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    this.uploadZone.classList.add('drag-over');
                });

                this.uploadZone.addEventListener('dragleave', () => {
                    this.uploadZone.classList.remove('drag-over');
                });

                this.uploadZone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    this.uploadZone.classList.remove('drag-over');
                    this.handleFiles(Array.from(e.dataTransfer.files));
                });

                // Control buttons
                document.getElementById('uploadBtn')?.addEventListener('click', () => {
                    this.simulateUpload();
                });

                document.getElementById('clearBtn')?.addEventListener('click', () => {
                    this.clearFiles();
                });

                document.getElementById('uploadAnother')?.addEventListener('click', () => {
                    this.resetUploader();
                });
            }

            handleFiles(files) {
                this.files = files;
                this.displayFiles();
                this.showUploadControls();
            }

            displayFiles() {
                const fileList = document.getElementById('fileList');
                const fileItems = document.getElementById('fileItems');
                
                fileItems.innerHTML = '';
                
                this.files.forEach((file, index) => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'bg-white/10 rounded-lg p-3 flex items-center justify-between bounce-in';
                    fileItem.style.animationDelay = `${index * 0.1}s`;
                    
                    fileItem.innerHTML = `
                        <div class="flex items-center">
                            <div class="text-2xl mr-3">${this.getFileIcon(file.type)}</div>
                            <div>
                                <p class="text-white font-medium">${file.name}</p>
                                <p class="text-white/60 text-sm">${this.formatFileSize(file.size)}</p>
                            </div>
                        </div>
                        <button onclick="uploader.removeFile(${index})" class="text-white/60 hover:text-white transition-colors">
                            ✕
                        </button>
                    `;
                    
                    fileItems.appendChild(fileItem);
                });
                
                fileList.classList.remove('hidden');
            }

            getFileIcon(type) {
                if (type.startsWith('image/')) return '🖼️';
                if (type.startsWith('video/')) return '🎥';
                if (type.startsWith('audio/')) return '🎵';
                if (type.includes('pdf')) return '📄';
                if (type.includes('word')) return '📝';
                if (type.includes('excel')) return '📊';
                return '📁';
            }

            formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }

            showUploadControls() {
                document.getElementById('uploadControls').classList.remove('hidden');
            }

            removeFile(index) {
                this.files.splice(index, 1);
                if (this.files.length === 0) {
                    this.clearFiles();
                } else {
                    this.displayFiles();
                }
            }

            clearFiles() {
                this.files = [];
                document.getElementById('fileList').classList.add('hidden');
                document.getElementById('uploadControls').classList.add('hidden');
                this.fileInput.value = '';
            }

            simulateUpload() {
                document.getElementById('uploadContent').classList.add('hidden');
                document.getElementById('uploadProgress').classList.remove('hidden');
                
                let progress = 0;
                const progressBar = document.getElementById('progressBar');
                const progressText = document.getElementById('progressText');
                
                const interval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        setTimeout(() => this.showSuccess(), 500);
                    }
                    
                    progressBar.style.width = progress + '%';
                    progressText.textContent = Math.round(progress) + '% complete';
                }, 200);
            }

            showSuccess() {
                document.getElementById('uploadProgress').classList.add('hidden');
                document.getElementById('successState').classList.remove('hidden');
                document.getElementById('fileList').classList.add('hidden');
                document.getElementById('uploadControls').classList.add('hidden');
            }

            resetUploader() {
                document.getElementById('successState').classList.add('hidden');
                document.getElementById('uploadContent').classList.remove('hidden');
                this.clearFiles();
            }
        }

        // Initialize the uploader
        const uploader = new FileUploader();

        // Add some sparkle effects
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'fixed w-1 h-1 bg-white rounded-full pointer-events-none';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.animation = 'fadeIn 2s ease-out forwards';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }

        // Create sparkles periodically
        setInterval(createSparkle, 3000);
    