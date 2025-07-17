-- TIK APPS Database Schema
-- Database: tik_apps

-- Create database
CREATE DATABASE IF NOT EXISTS tik_apps CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE tik_apps;

-- Users table (Laravel default)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') DEFAULT 'student',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students table (66 columns Dapodik format)
CREATE TABLE IF NOT EXISTS students (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    nis VARCHAR(20) UNIQUE,
    nisn VARCHAR(20) UNIQUE,
    nama_lengkap VARCHAR(100),
    jenis_kelamin ENUM('L', 'P'),
    tempat_lahir VARCHAR(50),
    tanggal_lahir DATE,
    agama VARCHAR(20),
    alamat_jalan TEXT,
    rt VARCHAR(5),
    rw VARCHAR(5),
    kelurahan VARCHAR(50),
    kecamatan VARCHAR(50),
    kabupaten VARCHAR(50),
    provinsi VARCHAR(50),
    kode_pos VARCHAR(10),
    no_telepon VARCHAR(20),
    email VARCHAR(100),
    nama_ayah VARCHAR(100),
    nama_ibu VARCHAR(100),
    pekerjaan_ayah VARCHAR(50),
    pekerjaan_ibu VARCHAR(50),
    alamat_ortu TEXT,
    no_telepon_ortu VARCHAR(20),
    nama_wali VARCHAR(100),
    alamat_wali TEXT,
    no_telepon_wali VARCHAR(20),
    kelas VARCHAR(10),
    jurusan VARCHAR(50),
    semester INT,
    tahun_ajaran VARCHAR(9),
    foto VARCHAR(255),
    dokumen_kk VARCHAR(255),
    dokumen_akte VARCHAR(255),
    status ENUM('aktif', 'lulus', 'pindah', 'keluar') DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Courses table (CP & TP Informatika)
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kode_mk VARCHAR(20) UNIQUE,
    nama_mk VARCHAR(100),
    cp_kode VARCHAR(20),
    cp_deskripsi TEXT,
    tp_kode VARCHAR(20),
    tp_deskripsi TEXT,
    semester INT,
    kelas VARCHAR(10),
    tahun_ajaran VARCHAR(9),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Schedules table
CREATE TABLE IF NOT EXISTS schedules (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT UNSIGNED,
    hari ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'),
    jam_mulai TIME,
    jam_selesai TIME,
    ruangan VARCHAR(20),
    materi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT UNSIGNED,
    judul VARCHAR(255),
    deskripsi TEXT,
    tipe ENUM('tugas', 'proyek', 'quiz'),
    deadline DATETIME,
    file_path VARCHAR(255),
    bobot FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Assignment submissions table
CREATE TABLE IF NOT EXISTS assignment_submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    assignment_id BIGINT UNSIGNED,
    student_id BIGINT UNSIGNED,
    file_path VARCHAR(255),
    nilai FLOAT,
    feedback TEXT,
    status ENUM('dikirim', 'dinilai', 'revisi', 'selesai') DEFAULT 'dikirim',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED,
    course_id BIGINT UNSIGNED,
    tipe ENUM('tugas', 'uts', 'uas', 'proyek'),
    nilai FLOAT,
    bobot FLOAT,
    semester INT,
    tahun_ajaran VARCHAR(9),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Attendance records table
CREATE TABLE IF NOT EXISTS attendance_records (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED,
    tanggal DATE,
    jam_masuk TIME,
    jam_keluar TIME,
    status ENUM('hadir', 'izin', 'sakit', 'terlambat', 'alpha', 'di_luar_waktu') DEFAULT 'hadir',
    keterangan TEXT,
    rfid_uid VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED,
    judul VARCHAR(255),
    deskripsi TEXT,
    kategori ENUM('prestasi', 'tugas_khusus', 'sertifikat', 'lainnya'),
    file_path VARCHAR(255),
    tanggal DATE,
    semester INT,
    tahun_ajaran VARCHAR(9),
    status ENUM('pending', 'disetujui', 'ditolak') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- WhatsApp templates table
CREATE TABLE IF NOT EXISTS whatsapp_templates (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama_template VARCHAR(100),
    isi_pesan TEXT,
    tipe ENUM('reminder_tugas', 'presensi', 'nilai', 'umum'),
    status ENUM('aktif', 'nonaktif') DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- App settings table
CREATE TABLE IF NOT EXISTS app_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama_sekolah VARCHAR(255),
    alamat_sekolah TEXT,
    telepon_sekolah VARCHAR(20),
    email_sekolah VARCHAR(100),
    logo VARCHAR(255),
    tema_warna VARCHAR(20) DEFAULT 'green',
    teks_login TEXT,
    wa_token VARCHAR(255),
    wa_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (name, email, password, role) VALUES 
('Admin TIK', 'admin@tik.sch.id', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert default app settings
INSERT INTO app_settings (nama_sekolah, alamat_sekolah, telepon_sekolah, email_sekolah, tema_warna) VALUES 
('SMP Negeri 1 TIK', 'Jl. Informatika No. 123, Kota', '021-12345678', 'info@tik.sch.id', 'green');

-- Insert default WhatsApp templates
INSERT INTO whatsapp_templates (nama_template, isi_pesan, tipe) VALUES 
('Reminder Tugas', 'Halo {nama}, tugas {judul_tugas} deadline {deadline}. Jangan lupa dikumpulkan ya!', 'reminder_tugas'),
('Presensi', 'Ananda {nama} telah melakukan presensi pada {tanggal} jam {jam}. Status: {status}', 'presensi'),
('Nilai', 'Halo {nama}, nilai {tipe} untuk {mata_kuliah} telah keluar: {nilai}', 'nilai');
