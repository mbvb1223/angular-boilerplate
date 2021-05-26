import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { PartModel } from '@core/models/part.model';
import { PartService } from '@core/services/part.service';
import { NoteModel } from '@core/models/note.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommentModel } from '@core/models/comment.model';

@Component({
  selector: 'app-part-item',
  templateUrl: './part-item.component.html',
  styleUrls: ['./part-item.component.scss'],
})
export class PartItemComponent implements OnInit, OnDestroy {
  @Input() part: PartModel;
  notes: Array<NoteModel>;
  comments: Array<CommentModel>;
  form: FormGroup;
  isClickedNoteTab = false;
  isClickedCommentTab = false;

  constructor(
    private partService: PartService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      note: [null, Validators.required],
      comment: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {}

  selectedTabChange(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      return;
    }

    if (event.index === 1 && !this.isClickedNoteTab) {
      this.isClickedNoteTab = true;
      this.getNotes();
      return;
    }

    if (event.index === 2 && !this.isClickedCommentTab) {
      this.isClickedCommentTab = true;
      this.getComments();
      return;
    }
  }

  getComments(): void {
    this.partService
      .getCommentsByPartId(this.part.id)
      .subscribe((comments: Array<CommentModel>) => {
        this.comments = comments;
      });
  }

  getNotes(): void {
    this.partService
      .getNotesByPartId(this.part.id)
      .subscribe((notes: Array<NoteModel>) => {
        this.notes = notes;
      });
  }

  shouldDisableNoteSubmit(): boolean {
    return !this.form.get('note')?.value;
  }

  submitNote() {
    this.partService
      .submitNote(this.part.id, {
        content: this.form.get('note')?.value,
      })
      .subscribe((note: NoteModel) => {
        this.getNotes();
        this.form.controls['note'].setValue('');
      });
  }

  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  shouldDisableCommentSubmit(): boolean {
    return !this.form.get('comment')?.value;
  }

  submitComment() {
    this.partService
      .submitComment(this.part.id, {
        content: this.form.get('comment')?.value,
      })
      .subscribe((comment: CommentModel) => {
        this.getComments();
        this.form.controls['comment'].setValue('');
      });
  }
}
