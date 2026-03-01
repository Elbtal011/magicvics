-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "admin_notes" TEXT,
ADD COLUMN     "banned_until" TIMESTAMP(3),
ADD COLUMN     "bic" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "health_insurance" TEXT,
ADD COLUMN     "iban" TEXT,
ADD COLUMN     "kyc_status" TEXT DEFAULT 'pending',
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "recipient_name" TEXT,
ADD COLUMN     "social_security_number" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "tax_number" TEXT;

-- CreateTable
CREATE TABLE "worker_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT DEFAULT '#3b82f6',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "worker_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker_tag_assignments" (
    "id" TEXT NOT NULL,
    "worker_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "worker_tag_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_assignments" (
    "id" TEXT NOT NULL,
    "assignee_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "due_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker_balances" (
    "id" TEXT NOT NULL,
    "worker_id" TEXT NOT NULL,
    "amount_cents" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "description" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "worker_balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_entries" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "hours" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'approved',
    "description" TEXT,
    "entry_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "time_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "worker_tags_name_key" ON "worker_tags"("name");

-- CreateIndex
CREATE INDEX "worker_tag_assignments_worker_id_idx" ON "worker_tag_assignments"("worker_id");

-- CreateIndex
CREATE INDEX "worker_tag_assignments_tag_id_idx" ON "worker_tag_assignments"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "worker_tag_assignments_worker_id_tag_id_key" ON "worker_tag_assignments"("worker_id", "tag_id");

-- CreateIndex
CREATE INDEX "task_assignments_assignee_id_idx" ON "task_assignments"("assignee_id");

-- CreateIndex
CREATE INDEX "worker_balances_worker_id_idx" ON "worker_balances"("worker_id");

-- CreateIndex
CREATE INDEX "time_entries_employee_id_idx" ON "time_entries"("employee_id");

-- CreateIndex
CREATE INDEX "Employee_status_idx" ON "Employee"("status");

-- CreateIndex
CREATE INDEX "Profile_role_idx" ON "Profile"("role");

-- AddForeignKey
ALTER TABLE "worker_tag_assignments" ADD CONSTRAINT "worker_tag_assignments_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_tag_assignments" ADD CONSTRAINT "worker_tag_assignments_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "worker_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_assignments" ADD CONSTRAINT "task_assignments_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_balances" ADD CONSTRAINT "worker_balances_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
